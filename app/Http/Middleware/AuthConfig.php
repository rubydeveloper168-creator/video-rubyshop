<?php

namespace App\Http\Middleware;

use App\Services\SettingsService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AuthConfig
{
    public function __construct(private SettingsService $settingsService) {}

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $setting = $this->settingsService->getSetting([
            'type' => 'auth',
            'sub_type' => 'google'
        ]);

        $fields = $setting?->fields ?? [];

        $envStatus = filter_var(env('GOOGLE_STATUS', false), FILTER_VALIDATE_BOOLEAN);
        $status = array_key_exists('active', $fields)
            ? (bool) $fields['active']
            : $envStatus;

        if (!$status && $envStatus) {
            $status = true;
        }

        $clientId = trim($fields['client_id'] ?? '') ?: env('GOOGLE_CLIENT_ID');
        $clientSecret = trim($fields['client_secret'] ?? '') ?: env('GOOGLE_CLIENT_SECRET');
        $redirect = trim($fields['redirect'] ?? '') ?: env('GOOGLE_REDIRECT_URI');

        config([
            'services.google.status' => $status,
            'services.google.client_id' => $clientId,
            'services.google.client_secret' => $clientSecret,
            'services.google.redirect' => $redirect,
        ]);

        return $next($request);
    }
}
