<?php

namespace App\Models\Audit;

use App\Models\Course\Course;
use App\Models\Course\SectionLesson;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserVideoEvent extends Model
{
    protected $fillable = [
        'user_id',
        'audit_session_id',
        'session_id',
        'course_id',
        'lesson_id',
        'event_type',
        'playback_position',
        'watched_seconds',
        'percent_watched',
        'metadata',
    ];

    protected $casts = [
        'metadata' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function auditSession(): BelongsTo
    {
        return $this->belongsTo(UserAuditSession::class, 'audit_session_id');
    }

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function lesson(): BelongsTo
    {
        return $this->belongsTo(SectionLesson::class, 'lesson_id');
    }
}
