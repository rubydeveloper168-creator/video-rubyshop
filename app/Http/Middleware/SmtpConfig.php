<?php

namespace App\Http\Middleware;

use App\Services\SettingsService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SmtpConfig
{
    public function __construct(private SettingsService $settingsService) {}

    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $setting = $this->settingsService->getSetting(['type' => 'smtp']);
        $smtp = $setting?->fields ?? [];

        $defaultMailer = env('MAIL_MAILER', config('mail.default'));
        $defaultHost = env('MAIL_HOST', config('mail.mailers.smtp.host'));
        $defaultPort = (int) env('MAIL_PORT', config('mail.mailers.smtp.port'));
        $defaultEncryption = env('MAIL_ENCRYPTION', config('mail.mailers.smtp.encryption'));
        $defaultUsername = env('MAIL_USERNAME', config('mail.mailers.smtp.username'));
        $defaultPassword = env('MAIL_PASSWORD', config('mail.mailers.smtp.password'));
        $defaultFromName = env('MAIL_FROM_NAME', config('mail.from.name'));
        $defaultFromAddress = env('MAIL_FROM_ADDRESS', config('mail.from.address', 'no-reply@example.com'));

        $pick = static function ($value, $fallback, bool $numeric = false) {
            if ($numeric) {
                if ($value === null || $value === '') {
                    return $fallback;
                }
                if (is_numeric($value)) {
                    return $value + 0;
                }
                return $fallback;
            }

            if (is_string($value)) {
                $trimmed = trim($value);
                return $trimmed !== '' ? $trimmed : $fallback;
            }

            return $value ?? $fallback;
        };

        $mailer = $pick($smtp['mail_mailer'] ?? null, $defaultMailer);
        $host = $pick($smtp['mail_host'] ?? null, $defaultHost);
        $port = $pick($smtp['mail_port'] ?? null, $defaultPort, true);
        $encryption = $pick($smtp['mail_encryption'] ?? null, $defaultEncryption);
        $username = $pick($smtp['mail_username'] ?? null, $defaultUsername);
        $password = $pick($smtp['mail_password'] ?? null, $defaultPassword);
        $fromName = $pick($smtp['mail_from_name'] ?? null, $defaultFromName);
        $fromAddress = $pick($smtp['mail_from_address'] ?? null, $defaultFromAddress);

        config([
            'mail.default' => $mailer,
            'mail.mailers.smtp.host' => $host,
            'mail.mailers.smtp.port' => $port,
            'mail.mailers.smtp.encryption' => $encryption,
            'mail.mailers.smtp.username' => $username,
            'mail.mailers.smtp.password' => $password,
            'mail.mailers.smtp.timeout' => null,
            'mail.from.name' => $fromName,
            'mail.from.address' => $fromAddress,
        ]);

        return $next($request);
    }
}
