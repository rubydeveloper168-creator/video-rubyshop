<?php

use Illuminate\Support\Facades\Route;
use Modules\Updater\Http\Controllers\UpdaterController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/settings/backup', [UpdaterController::class, 'createBackup'])->name('settings.app.backup');
    Route::delete('/settings/backup/{id}', [UpdaterController::class, 'deleteBackup'])->name('settings.app.backup.delete');
    Route::post('/settings/backup/{id}/restore', [UpdaterController::class, 'restoreBackup'])->name('settings.app.backup.restore');
    Route::post('/settings/update', [UpdaterController::class, 'updateApp'])->name('settings.app.update');
    Route::post('/settings/refresh', [UpdaterController::class, 'refreshServer'])->name('settings.app.refresh');
});
