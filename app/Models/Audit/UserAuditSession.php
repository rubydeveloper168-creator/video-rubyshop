<?php

namespace App\Models\Audit;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UserAuditSession extends Model
{
    protected $fillable = [
        'user_id',
        'session_id',
        'ip_address',
        'user_agent',
        'started_at',
        'ended_at',
        'last_activity_at',
        'active_seconds',
        'idle_seconds',
    ];

    protected $casts = [
        'started_at' => 'datetime',
        'ended_at' => 'datetime',
        'last_activity_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function pageVisits(): HasMany
    {
        return $this->hasMany(UserPageVisit::class, 'audit_session_id');
    }

    public function videoEvents(): HasMany
    {
        return $this->hasMany(UserVideoEvent::class, 'audit_session_id');
    }

    public function activityEvents(): HasMany
    {
        return $this->hasMany(UserActivityEvent::class, 'audit_session_id');
    }
}
