<?php

namespace App\Services\Audit;

use App\Models\Audit\UserActivityEvent;
use App\Models\Audit\UserAuditSession;
use App\Models\Audit\UserPageVisit;
use App\Models\Audit\UserVideoEvent;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class AuditService
{
    public function sessionHash(Request $request): string
    {
        return hash('sha256', $request->session()->getId());
    }

    public function touchSession(Request $request, ?User $user = null): ?UserAuditSession
    {
        $user ??= $request->user();

        if (!$user) {
            return null;
        }

        $session = UserAuditSession::firstOrNew([
            'user_id' => $user->id,
            'session_id' => $this->sessionHash($request),
        ]);

        if (!$session->exists) {
            $session->started_at = now();
        }

        $session->forceFill([
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'last_activity_at' => now(),
        ])->save();

        return $session;
    }

    public function recordLogin(Request $request): void
    {
        $session = $this->touchSession($request);

        if (!$session) {
            return;
        }

        UserActivityEvent::create([
            'user_id' => $session->user_id,
            'audit_session_id' => $session->id,
            'session_id' => $session->session_id,
            'event_type' => 'login',
            'metadata' => [
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ],
        ]);
    }

    public function recordLogout(Request $request): void
    {
        $session = $this->touchSession($request);

        if (!$session) {
            return;
        }

        $session->update([
            'ended_at' => now(),
            'last_activity_at' => now(),
        ]);

        UserActivityEvent::create([
            'user_id' => $session->user_id,
            'audit_session_id' => $session->id,
            'session_id' => $session->session_id,
            'event_type' => 'logout',
            'metadata' => [
                'ip_address' => $request->ip(),
            ],
        ]);
    }

    public function recordPageEnter(Request $request, array $data): UserPageVisit
    {
        $session = $this->touchSession($request);

        return UserPageVisit::create([
            'user_id' => $request->user()->id,
            'audit_session_id' => $session?->id,
            'session_id' => $this->sessionHash($request),
            'route_name' => $data['route_name'] ?? null,
            'url' => $data['url'],
            'title' => $data['title'] ?? null,
            'referrer' => $data['referrer'] ?? null,
            'entered_at' => $this->parseClientTime($data['entered_at'] ?? null),
        ]);
    }

    public function recordPageLeave(Request $request, array $data): void
    {
        $this->touchSession($request);

        $visit = UserPageVisit::where('user_id', $request->user()->id)
            ->where('session_id', $this->sessionHash($request))
            ->where('url', $data['url'])
            ->whereNull('left_at')
            ->latest('id')
            ->first();

        if (!$visit) {
            return;
        }

        $leftAt = $this->parseClientTime($data['left_at'] ?? null) ?? now();
        $enteredAt = $visit->entered_at ?? now();
        $duration = max(0, $enteredAt->diffInSeconds($leftAt));

        $visit->update([
            'left_at' => $leftAt,
            'duration_seconds' => (int) ($data['duration_seconds'] ?? $duration),
        ]);
    }

    public function recordHeartbeat(Request $request, array $data): void
    {
        $session = $this->touchSession($request);

        if (!$session) {
            return;
        }

        $session->increment('active_seconds', (int) ($data['active_seconds'] ?? 0));
        $session->increment('idle_seconds', (int) ($data['idle_seconds'] ?? 0));
        $session->forceFill(['last_activity_at' => now()])->save();
    }

    public function recordVideoEvent(Request $request, array $data): UserVideoEvent
    {
        $session = $this->touchSession($request);

        return UserVideoEvent::create([
            'user_id' => $request->user()->id,
            'audit_session_id' => $session?->id,
            'session_id' => $this->sessionHash($request),
            'course_id' => $data['course_id'] ?? null,
            'lesson_id' => $data['lesson_id'] ?? null,
            'event_type' => $data['event_type'],
            'playback_position' => (int) ($data['playback_position'] ?? 0),
            'watched_seconds' => (int) ($data['watched_seconds'] ?? 0),
            'percent_watched' => $data['percent_watched'] ?? null,
            'metadata' => $data['metadata'] ?? null,
        ]);
    }

    public function recordActivity(Request $request, string $eventType, array $metadata = []): void
    {
        $session = $this->touchSession($request);

        if (!$session) {
            return;
        }

        UserActivityEvent::create([
            'user_id' => $session->user_id,
            'audit_session_id' => $session->id,
            'session_id' => $session->session_id,
            'event_type' => $eventType,
            'metadata' => $metadata,
        ]);
    }

    private function parseClientTime(?string $value): ?Carbon
    {
        if (!$value) {
            return now();
        }

        try {
            return Carbon::parse($value);
        } catch (\Throwable) {
            return now();
        }
    }
}
