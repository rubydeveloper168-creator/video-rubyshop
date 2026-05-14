<?php

namespace App\Http\Middleware;

use App\Services\SettingsService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SmtpConfigCheck
{
    public function __construct(private SettingsService $settingsService) {}

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (config('mail.default') === 'smtp') {
            $missingCredentials = empty(config('mail.mailers.smtp.host'))
                || empty(config('mail.mailers.smtp.port'))
                || empty(config('mail.mailers.smtp.username'))
                || empty(config('mail.mailers.smtp.password'));

            if ($missingCredentials) {
                logger()->warning('SMTP configuration incomplete. Proceeding without email delivery.', [
                    'host' => config('mail.mailers.smtp.host'),
                    'port' => config('mail.mailers.smtp.port'),
                    'username' => config('mail.mailers.smtp.username'),
                ]);
            }
        } else {
            logger()->warning('SMTP is not set as the default mailer. Proceeding without email delivery.', [
                'default_mailer' => config('mail.default'),
            ]);
        }

        return $next($request);
    }
}
