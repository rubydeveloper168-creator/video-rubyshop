<?php
// Run inside the app container: php tests/watch-history-empty-course.php
require __DIR__ . '/../vendor/autoload.php';
$app = require __DIR__ . '/../bootstrap/app.php';
$app->instance('request', Illuminate\Http\Request::create('https://video.rubyshop.co.th/'));
$kernel = $app->make(Illuminate\Contracts\Http\Kernel::class);
$kernel->bootstrap();
Illuminate\Support\Facades\DB::beginTransaction();
try {
    $course = App\Models\Course\Course::findOrFail(25);
    if (App\Models\Course\SectionLesson::where('course_id', $course->id)->exists()) {
        throw new RuntimeException('Regression fixture course 25 must have no lessons.');
    }
    $service = $app->make(App\Services\Course\CourseSectionService::class);
    if ($service->initWatchHistory('25', 'lesson', '2') !== null) {
        throw new RuntimeException('Empty course should have no watch history.');
    }
    Illuminate\Support\Facades\Auth::onceUsingId(2);
    $request = Illuminate\Http\Request::create('https://video.rubyshop.co.th/courses/details/rb-1095/25');
    $response = $kernel->handle($request);
    if ($response->getStatusCode() !== 200) {
        throw new RuntimeException('Authenticated course page returned ' . $response->getStatusCode());
    }
    $existing = App\Models\Course\WatchHistory::first();
    if ($existing && $service->initWatchHistory((string) $existing->course_id, 'lesson', (string) $existing->user_id)->id !== $existing->id) {
        throw new RuntimeException('Existing watch history changed.');
    }
    try {
        $app->make(App\Http\Controllers\Course\PlayerController::class)->intWatchHistory(
            Illuminate\Http\Request::create('/player/init/watch-history', 'POST', ['course_id' => 25])
        );
        throw new RuntimeException('Empty player should return 404.');
    } catch (Symfony\Component\HttpKernel\Exception\HttpException $e) {
        if ($e->getStatusCode() !== 404) {
            throw $e;
        }
    }
    echo "PASS: empty course returns null; authenticated course page returns 200; existing history preserved; empty player returns 404.\n";
} finally {
    Illuminate\Support\Facades\DB::rollBack();
}
