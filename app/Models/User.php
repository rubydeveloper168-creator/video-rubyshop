<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use App\Notifications\VerifyEmailNotification;
use App\Models\Audit\UserActivityEvent;
use App\Models\Audit\UserAuditSession;
use App\Models\Audit\UserPageVisit;
use App\Models\Audit\UserVideoEvent;

class User extends Authenticatable implements HasMedia, MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, InteractsWithMedia;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'status',
        'is_verified',
        'verified_at',
        'verified_by',
        'photo',
        'google_id',
        'social_links',
        'email_verified_at',
        'instructor_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'social_links' => 'array',
        'status' => 'integer',
        'is_verified' => 'boolean',
        'verified_at' => 'datetime',
    ];

    public function instructor(): BelongsTo
    {
        return $this->belongsTo(Instructor::class);
    }

    public function auditSessions(): HasMany
    {
        return $this->hasMany(UserAuditSession::class);
    }

    public function pageVisits(): HasMany
    {
        return $this->hasMany(UserPageVisit::class);
    }

    public function videoEvents(): HasMany
    {
        return $this->hasMany(UserVideoEvent::class);
    }

    public function activityEvents(): HasMany
    {
        return $this->hasMany(UserActivityEvent::class);
    }

    public function verifiedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'verified_by');
    }

    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyEmailNotification);
    }
}
