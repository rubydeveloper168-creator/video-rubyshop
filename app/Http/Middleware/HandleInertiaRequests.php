<?php

namespace App\Http\Middleware;

use App\Services\NotificationService;
use App\Services\SettingsService;
use App\Services\StudentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    public function __construct(
        private StudentService $studentService,
        private SettingsService $settingsService,
        private NotificationService $notificationService,
    ) {}

    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        try {
            DB::connection()->getPdo();
        } catch (\Throwable $th) {
            return [];
        }

        $user = Auth::user();

        return [
            ...parent::share($request),
            'page' => app('intro_page'),
            'auth' => ['user' => $user],
            'system' => app('system_settings'),
            'customize' => $request->query('customize', false),
            'navbar' => $this->settingsService->getNavbar('navbar_1'),
            'footer' => $this->settingsService->getFooter('footer_1'),
            'notifications' => $user ? $this->notificationService->notifications(['unread' => true]) : [],
            'ziggy' => fn(): array => [
                ...(new Ziggy)->toArray(),
                'location' => config('app.url'),
            ],
            'flash' => [
                'error' => fn() => $request->session()->get('error'),
                'warning' => fn() => $request->session()->get('warning'),
                'success' => fn() => $request->session()->get('success'),
            ],
        ];
    }
}
