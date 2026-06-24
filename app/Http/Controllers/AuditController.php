<?php

namespace App\Http\Controllers;

use App\Models\Audit\UserActivityEvent;
use App\Models\Audit\UserAuditSession;
use App\Models\Audit\UserPageVisit;
use App\Models\Audit\UserVideoEvent;
use App\Models\User;
use App\Services\Audit\AuditService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AuditController extends Controller
{
    public function __construct(private AuditService $auditService) {}

    public function index(Request $request): Response
    {
        $users = User::query()
            ->withCount(['auditSessions', 'pageVisits', 'videoEvents'])
            ->latest('updated_at')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('dashboard/audit/index', [
            'users' => $users,
            'summary' => [
                'sessions' => UserAuditSession::count(),
                'page_visits' => UserPageVisit::count(),
                'video_events' => UserVideoEvent::count(),
            ],
        ]);
    }

    public function show(Request $request, User $user): Response
    {
        $sessions = UserAuditSession::where('user_id', $user->id)
            ->latest('last_activity_at')
            ->limit(20)
            ->get()
            ->map(function (UserAuditSession $session) {
                $device = $this->auditService->parseUserAgent($session->user_agent);

                $session->browser = $device['browser'];
                $session->os = $device['os'];
                $session->device_type = $device['device_type'];
                $session->is_online = !$session->ended_at
                    && $session->last_activity_at
                    && $session->last_activity_at->gte(now()->subMinutes(5));

                return $session;
            });

        $pageVisits = UserPageVisit::where('user_id', $user->id)
            ->latest('entered_at')
            ->limit(100)
            ->get();

        $videoEvents = UserVideoEvent::with(['course:id,title', 'lesson:id,title'])
            ->where('user_id', $user->id)
            ->latest()
            ->limit(100)
            ->get();

        $activityEvents = UserActivityEvent::where('user_id', $user->id)
            ->latest()
            ->limit(100)
            ->get();

        $since = now()->subDays(13)->startOfDay();

        $pageSecondsByDay = UserPageVisit::where('user_id', $user->id)
            ->where('entered_at', '>=', $since)
            ->selectRaw('DATE(entered_at) as day, SUM(duration_seconds) as seconds')
            ->groupBy('day')
            ->pluck('seconds', 'day');

        $videoSecondsByDay = UserVideoEvent::where('user_id', $user->id)
            ->where('created_at', '>=', $since)
            ->selectRaw('DATE(created_at) as day, SUM(watched_seconds) as seconds')
            ->groupBy('day')
            ->pluck('seconds', 'day');

        $dailyActivity = [];
        for ($i = 13; $i >= 0; $i--) {
            $date = now()->subDays($i)->format('Y-m-d');
            $dailyActivity[] = [
                'date' => $date,
                'page_minutes' => round(($pageSecondsByDay[$date] ?? 0) / 60, 1),
                'video_minutes' => round(($videoSecondsByDay[$date] ?? 0) / 60, 1),
            ];
        }

        $topPages = UserPageVisit::where('user_id', $user->id)
            ->selectRaw('url, MAX(title) as title, COUNT(*) as visits, SUM(duration_seconds) as total_seconds')
            ->groupBy('url')
            ->orderByDesc('visits')
            ->limit(5)
            ->get();

        $topVideos = UserVideoEvent::with('lesson:id,title')
            ->where('user_id', $user->id)
            ->whereNotNull('lesson_id')
            ->selectRaw('lesson_id, SUM(watched_seconds) as total_seconds, MAX(percent_watched) as max_percent')
            ->groupBy('lesson_id')
            ->orderByDesc('total_seconds')
            ->limit(5)
            ->get();

        $totals = [
            'sessions' => UserAuditSession::where('user_id', $user->id)->count(),
            'page_visits' => UserPageVisit::where('user_id', $user->id)->count(),
            'video_events' => UserVideoEvent::where('user_id', $user->id)->count(),
            'active_seconds' => (int) UserAuditSession::where('user_id', $user->id)->sum('active_seconds'),
            'idle_seconds' => (int) UserAuditSession::where('user_id', $user->id)->sum('idle_seconds'),
        ];

        return Inertia::render('dashboard/audit/show', [
            'auditUser' => $user,
            'sessions' => $sessions,
            'pageVisits' => $pageVisits,
            'videoEvents' => $videoEvents,
            'activityEvents' => $activityEvents,
            'dailyActivity' => $dailyActivity,
            'topPages' => $topPages,
            'topVideos' => $topVideos,
            'totals' => $totals,
        ]);
    }

    public function toggleVerify(Request $request, User $user): RedirectResponse
    {
        if ($user->is_verified) {
            $user->update([
                'is_verified' => false,
                'verified_at' => null,
                'verified_by' => null,
            ]);

            return back()->with('success', "{$user->name} has been unverified.");
        }

        $user->update([
            'is_verified' => true,
            'verified_at' => now(),
            'verified_by' => $request->user()->id,
        ]);

        return back()->with('success', "{$user->name} has been verified.");
    }

    public function pageEnter(Request $request): JsonResponse
    {
        $data = $request->validate([
            'url' => 'required|string|max:2048',
            'route_name' => 'nullable|string|max:255',
            'title' => 'nullable|string|max:255',
            'referrer' => 'nullable|string|max:2048',
            'entered_at' => 'nullable|string',
        ]);

        $visit = $this->auditService->recordPageEnter($request, $data);

        return response()->json(['ok' => true, 'visit_id' => $visit->id]);
    }

    public function pageLeave(Request $request): JsonResponse
    {
        $data = $request->validate([
            'url' => 'required|string|max:2048',
            'left_at' => 'nullable|string',
            'duration_seconds' => 'nullable|integer|min:0',
        ]);

        $this->auditService->recordPageLeave($request, $data);

        return response()->json(['ok' => true]);
    }

    public function heartbeat(Request $request): JsonResponse
    {
        $data = $request->validate([
            'active_seconds' => 'nullable|integer|min:0|max:3600',
            'idle_seconds' => 'nullable|integer|min:0|max:3600',
        ]);

        $this->auditService->recordHeartbeat($request, $data);

        return response()->json(['ok' => true]);
    }

    public function videoEvent(Request $request): JsonResponse
    {
        $data = $request->validate([
            'course_id' => 'nullable|integer|exists:courses,id',
            'lesson_id' => 'nullable|integer|exists:section_lessons,id',
            'event_type' => 'required|string|max:40',
            'playback_position' => 'nullable|integer|min:0',
            'watched_seconds' => 'nullable|integer|min:0',
            'percent_watched' => 'nullable|integer|min:0|max:100',
            'metadata' => 'nullable|array',
        ]);

        $event = $this->auditService->recordVideoEvent($request, $data);

        return response()->json(['ok' => true, 'event_id' => $event->id]);
    }
}
