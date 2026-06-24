<?php

namespace App\Http\Controllers;

use App\Models\Audit\UserActivityEvent;
use App\Models\Audit\UserAuditSession;
use App\Models\Audit\UserPageVisit;
use App\Models\Audit\UserVideoEvent;
use App\Models\User;
use App\Services\Audit\AuditService;
use Illuminate\Http\JsonResponse;
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
            ->get();

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

        return Inertia::render('dashboard/audit/show', [
            'auditUser' => $user,
            'sessions' => $sessions,
            'pageVisits' => $pageVisits,
            'videoEvents' => $videoEvents,
            'activityEvents' => $activityEvents,
        ]);
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
