<?php

use App\Http\Controllers\Api\VideoProcessingController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

// Video Processing API Routes
Route::prefix('video')->name('api.video.')->group(function () {
    Route::post('/processing-callback', [VideoProcessingController::class, 'processingCallback'])
        ->name('processing-callback');
    
    Route::get('/status/{lessonId}', [VideoProcessingController::class, 'getStatus'])
        ->name('status');
    
    Route::post('/retry/{lessonId}', [VideoProcessingController::class, 'retryProcessing'])
        ->name('retry');
});
