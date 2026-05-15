<?php

use App\Http\Controllers\Course\CourseController;
use App\Http\Controllers\Course\PlayerController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InstructorController;
use App\Http\Controllers\JobCircularController;
use App\Http\Controllers\SubscribeController;
use App\Http\Controllers\SystemController;
use Illuminate\Support\Facades\Route;
use Modules\Installer\Http\Controllers\InstallerController;

Route::get('/', [HomeController::class, 'index'])->name('home')->middleware('customize');
Route::get('demo/{slug}', [HomeController::class, 'demo'])->name('home.demo')->middleware('customize');
Route::get('job-circulars/{job_circular}', [JobCircularController::class, 'show'])->name('job-circulars.show');

Route::get('system/reboot', [SystemController::class, 'index'])->name('system.reboot');
Route::post('system/reboot/verify', [SystemController::class, 'verify'])->name('system.reboot.verify');
Route::get('system/reboot/confirm', [SystemController::class, 'confirm'])->name('system.reboot.confirm');
Route::post('system/reboot/execute', [SystemController::class, 'reboot'])->name('system.reboot.execute');
Route::get('install/refresh', [InstallerController::class, 'refresh'])->name('install.refresh');

// course page
Route::controller(CourseController::class)->group(function () {
    Route::get('courses/{category}/{category_child?}', 'category_courses')->name('category.courses');
    Route::get('courses/details/{slug}/{id}', 'show')->name('course.details');
});

Route::controller(PlayerController::class)->group(function () {
    Route::get('play-course/{type}/{watch_history}/{lesson_id}', 'course_player')->name('course.player');
    Route::get('play-course/finish/{watch_history}', 'finish_course')->name('course.player.finish');
});

Route::get('instructors/{instructor}', [InstructorController::class, 'show'])->name('instructors.show');
Route::resource('subscribes', SubscribeController::class)->only(['index', 'store']);
