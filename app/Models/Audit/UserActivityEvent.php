<?php

namespace App\Models\Audit;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class UserActivityEvent extends Model
{
    protected $fillable = [
        'user_id',
        'audit_session_id',
        'session_id',
        'event_type',
        'subject_type',
        'subject_id',
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

    public function subject(): MorphTo
    {
        return $this->morphTo();
    }
}
