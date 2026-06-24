<?php

namespace App\Models\Audit;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserPageVisit extends Model
{
    protected $fillable = [
        'user_id',
        'audit_session_id',
        'session_id',
        'route_name',
        'url',
        'title',
        'referrer',
        'entered_at',
        'left_at',
        'duration_seconds',
    ];

    protected $casts = [
        'entered_at' => 'datetime',
        'left_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function auditSession(): BelongsTo
    {
        return $this->belongsTo(UserAuditSession::class, 'audit_session_id');
    }
}
