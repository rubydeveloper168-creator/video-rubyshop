<?php

use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
        using: function () {
            // Web Routes
            Route::middleware(['web', 'installed', 'appConfig'])->group(function () {
                // Public routes
                require base_path('routes/web.php');

                // Auth routes
                Route::middleware(['smtpConfig'])->group(base_path('routes/auth.php'));

                // Admin routes
                Route::middleware(['auth', 'role:admin'])->group(base_path('routes/admin.php'));

                // Instructor routes
                Route::middleware(['auth', 'verified', 'role:admin,instructor'])->group(base_path('routes/instructor.php'));

                // Student routes
                Route::middleware(['auth', 'role:student,instructor,admin'])->group(base_path('routes/student.php'));

                // Payout routes
                Route::middleware(['auth', 'role:admin'])->group(base_path('routes/payout.php'));

                Route::get('/{slug}', [HomeController::class, 'inner_page'])->name('inner.page');
            });

            // API Routes
            Route::prefix('api')
                ->middleware(['api', 'installed'])
                ->group(base_path('routes/api.php'));
        },
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->api(prepend: [
            \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        ]);

        $middleware->encryptCookies(except: ['appearance']);

        $middleware->validateCsrfTokens(except: [
            'audit-track/*',
            'logout',
        ]);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->preventRequestsDuringMaintenance(except: [
            'system/reboot',
            'system/reboot/verify',
            'system/reboot/confirm',
            'system/reboot/execute',
            'install/refresh',
        ]);

        $middleware->alias([
            'customize' => \App\Http\Middleware\IntroCustomize::class,
            'appConfig' => \App\Http\Middleware\AppConfig::class,
            'authConfig' => \App\Http\Middleware\AuthConfig::class,
            'smtpConfig' => \App\Http\Middleware\SmtpConfig::class,
            'checkSmtp' => \App\Http\Middleware\SmtpConfigCheck::class,
            'checkEnroll' => \App\Http\Middleware\CheckEnroll::class,
            'checkCourseCreation' => \App\Http\Middleware\CheckCourseCreation::class,
            'ip.detector' => \App\Http\Middleware\IpDetectorMiddleware::class,
            'verifiedAccess' => \App\Http\Middleware\VerifiedAccess::class,
            'role' => \App\Http\Middleware\CheckRole::class,
            'installed' => \Modules\Installer\Http\Middleware\InstalledRoutes::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
