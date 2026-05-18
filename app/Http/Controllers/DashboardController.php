<?php

namespace App\Http\Controllers;

use App\Services\DashboardService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function __construct(
        protected DashboardService $dashboardService,
    ) {}

    public function index()
    {
        $user = Auth::user();

        if ($user->role !== 'admin') {
            return redirect()->route('student.index', ['tab' => 'courses']);
        }

        $currentYear = Carbon::now()->year;
        $data = $this->dashboardService->getDashboard($user, $currentYear);

        return Inertia::render('dashboard/index', $data);
    }
}
