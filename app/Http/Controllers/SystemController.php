<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\SystemRebootRequest;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Session;
use Inertia\Inertia;

class SystemController extends Controller
{
    public function index(Request $request)
    {
        // Clear verification session
        $request->session()->forget(['system_reboot_verified']);

        return Inertia::render('system/index');
    }

    public function verify(SystemRebootRequest $request)
    {
        // Store verification in session
        Session::put('system_reboot_verified', true);

        return redirect()->route('system.reboot.confirm');
    }

    public function confirm()
    {
        // Check if user is verified
        if (!Session::has('system_reboot_verified')) {
            return redirect()->route('system.reboot');
        }
        return Inertia::render('system/confirm');
    }

    public function reboot(Request $request)
    {
        // Check if user is verified
        if (!Session::has('system_reboot_verified')) {
            return redirect()->route('system.reboot');
        }

        // Clear caches without affecting logged in users
        Artisan::call('cache:clear');
        Artisan::call('config:clear');
        Artisan::call('route:clear');
        Artisan::call('view:clear');
        Artisan::call('optimize');
        Artisan::call('up');

        // Clear verification session
        $request->session()->forget(['system_reboot_verified']);

        // Store the success message in the session
        $request->session()->flash('success', 'System rebooted successfully!');

        return redirect()->route('home');
    }
}
