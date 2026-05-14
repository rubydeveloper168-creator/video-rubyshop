<?php

namespace Modules\Updater\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Modules\Updater\Models\Backup;
use Modules\Updater\Services\BackupService;
use Modules\Updater\Services\DataService;
use ZipArchive;

class UpdaterController extends Controller
{
    function __construct(
        private DataService $dataService,
        private BackupService $backupService
    ) {}

    /**
     * Create application backup
     */
    public function createBackup()
    {
        try {
            $backupName = 'backup_' . now()->format('Y_m_d_H_i_s');
            $backupDir = storage_path('app/backups');

            // Create backup directory if it doesn't exist
            if (!file_exists($backupDir)) {
                mkdir($backupDir, 0755, true);
            }

            // 1. Create source code backup first
            $sourceCodeZip = $this->backupService->createSourceCodeBackup($backupName, $backupDir);
            $sourceCodeSize = file_exists($sourceCodeZip) ? filesize($sourceCodeZip) : 0;

            // 2. Estimate database backup size (so we can include it in the record)
            $estimatedDatabaseSize = $this->backupService->estimateDatabaseBackupSize();

            // 3. Create backup record with actual source code size and estimated database size
            $backup = Backup::create([
                'backup_name' => $backupName,
                'source_code_zip' => $backupName . '_source_code.zip',
                'database_zip' => $backupName . '_database.zip',
                'source_code_size' => $sourceCodeSize,
                'database_size' => $estimatedDatabaseSize,
                'status' => 'completed',
                'notes' => 'Full application backup created successfully',
            ]);

            // 4. Create database backup (now includes the complete backup record with estimated size)
            $this->backupService->createDatabaseBackup($backupName, $backupDir);

            return redirect()->back()->with('success', 'Backup created successfully! Files: ' . $backup->source_code_zip . ', ' . $backup->database_zip);
        } catch (\Exception $e) {
            // If backup creation fails, delete the incomplete backup record
            if (isset($backup)) {
                $backup->delete();
            }

            return redirect()->back()->with('error', 'Backup failed: ' . $e->getMessage());
        }
    }

    /**
     * Delete backup by ID
     */
    public function deleteBackup($id)
    {
        try {
            $backup = $this->backupService->deleteFromBackup($id);

            // Prepare response message
            $message = "Backup '{$backup->backup_name}' deleted successfully.";
            if (!empty($deletedFiles)) {
                $message .= " Files removed: " . implode(', ', $deletedFiles) . ".";
            }
            if (!empty($failedFiles)) {
                $message .= " Warning: Could not delete some files: " . implode(', ', $failedFiles) . ".";
            }

            return redirect()->back()->with('success', $message);
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to delete backup: ' . $e->getMessage());
        }
    }

    /**
     * Restore backup by ID
     */
    public function restoreBackup($id)
    {
        $secret = null;

        try {
            // Find the backup record first (before maintenance mode)
            $backup = Backup::findOrFail($id);
            $backupDir = storage_path('app/backups');

            // Validate backup files exist
            $sourceCodePath = $backupDir . '/' . $backup->source_code_zip;
            $databasePath = $backupDir . '/' . $backup->database_zip;

            if (!file_exists($sourceCodePath)) {
                throw new \Exception('Source code backup file not found: ' . $backup->source_code_zip);
            }

            if (!file_exists($databasePath)) {
                throw new \Exception('Database backup file not found: ' . $backup->database_zip);
            }

            // Put app into maintenance mode with secret
            $secret = 'restore-' . now()->timestamp;
            Artisan::call('down', [
                '--secret' => $secret,
                '--render' => 'errors::503',
                '--retry'  => 60, // clients told to retry after 60s
            ]);

            // Store secret in cache (so frontend can show bypass link if needed)
            Cache::put('maintenance_secret', $secret, now()->addMinutes(30));

            // Log the restore start
            Log::info("Starting backup restore: {$backup->backup_name}", [
                'backup_id' => $backup->id,
                'user_id' => Auth::id(),
                'secret_url' => url($secret),
            ]);

            // Pre-update refresh
            Artisan::call('optimize:clear');

            // Perform the restore operation
            $this->backupService->restoreFromBackup($sourceCodePath, $databasePath);

            // Run optimization
            Artisan::call('optimize');

            // Log successful restore
            Log::info("Backup restore completed successfully: {$backup->backup_name}");

            return redirect()->back()->with('success', "Backup '{$backup->backup_name}' restored successfully! Please refresh the page.");
        } catch (\Exception $e) {
            // Log the error
            Log::error("Backup restore failed: " . $e->getMessage(), [
                'backup_id' => $id ?? null,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return redirect()->back()->with('error', 'Restore failed: ' . $e->getMessage());
        } finally {
            // Always disable maintenance mode, regardless of success or failure
            Artisan::call('up');
            Cache::forget('maintenance_secret');
            Log::info("Maintenance mode disabled after restore operation");
        }
    }

    /**
     * Update application from uploaded ZIP (using chunked upload)
     */
    public function updateApp(Request $request)
    {
        $request->validate([
            'update_file_url' => 'required|string',
        ]);

        $secret = null;
        $tempFilePath = null;

        try {
            // Get uploaded file path
            $updateFileUrl = $request->input('update_file_url');
            $relativePath = parse_url($updateFileUrl, PHP_URL_PATH);
            $tempFilePath = public_path($relativePath);

            // Validate file existence
            if (!file_exists($tempFilePath)) {
                throw new \Exception('Update file not found: ' . $updateFileUrl);
            }

            // Validate ZIP format by trying to open
            $zip = new ZipArchive();
            if ($zip->open($tempFilePath) !== true) {
                throw new \Exception('Invalid ZIP file');
            }
            $zip->close();

            // Put app into maintenance mode with secret
            $secret = 'update-' . now()->timestamp;
            Artisan::call('down', [
                '--secret' => $secret,
                '--render' => 'errors::503',
                '--retry'  => 60, // clients told to retry after 60s
            ]);

            // Store secret in cache (so frontend can show bypass link if needed)
            Cache::put('maintenance_secret', $secret, now()->addMinutes(30));

            Log::info("Starting application update", [
                'file_url'   => $updateFileUrl,
                'file_path'  => $tempFilePath,
                'file_size'  => filesize($tempFilePath),
                'user_id'    => Auth::id(),
                'secret_url' => url($secret),
            ]);

            // Pre-update refresh
            Artisan::call('optimize:clear');

            // Perform the update (your service)
            $this->backupService->updateApplicationFromZip($tempFilePath);

            // Run migrations
            Log::info("Running database migrations after update");
            Artisan::call('migrate', ['--force' => true]);

            // Run data updates / seeders
            $this->dataService->seedDataUpdater();
            Artisan::call('module:seed', [
                'module' => 'Blog',
                '--class' => 'BlogDatabaseSeeder',
                '--force' => true,
            ]);

            // Run optimization
            Artisan::call('optimize');

            // Delete temporary update file
            if (file_exists($tempFilePath)) {
                unlink($tempFilePath);
                Log::info("Temporary update file deleted: " . basename($tempFilePath));
            }

            Log::info("Application update completed successfully");

            return redirect()->back()->with(
                'success',
                'Application updated successfully! Migrations applied. Please refresh the page.'
            );
        } catch (\Exception $e) {
            // Clean up on error
            if ($tempFilePath && file_exists($tempFilePath)) {
                unlink($tempFilePath);
            }

            Log::error("Application update failed: " . $e->getMessage(), [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return redirect()->back()->with('error', 'Update failed: ' . $e->getMessage());
        } finally {
            // Always disable maintenance mode
            Artisan::call('up');
            Cache::forget('maintenance_secret');
            Log::info("Maintenance mode disabled after update operation");
        }
    }

    /**
     * Refresh server - Clear caches and optimize for shared hosting
     */
    public function refreshServer()
    {
        try {
            Log::info('Server refresh initiated by user: ' . Auth::id());
            $operations = [];

            Artisan::call('optimize:clear');

            // Clear OPcache if available
            if (function_exists('opcache_reset')) {
                opcache_reset();
            }

            // Clear framework cache files manually
            $cachePath = storage_path('framework/cache/data');
            if (is_dir($cachePath)) {
                $files = glob($cachePath . '/*');
                foreach ($files as $file) {
                    if (is_file($file)) {
                        unlink($file);
                    }
                }
            }

            // Touch .env file to trigger application reload
            $envPath = base_path('.env');
            if (file_exists($envPath)) {
                touch($envPath);
            }

            Log::info('Server refresh completed successfully. Operations: ' . implode(', ', $operations));

            $message = 'Server refreshed successfully! Operations completed: ' . implode(', ', $operations);
            return redirect()->back()->with('success', $message);
        } catch (\Exception $e) {
            Log::error('Server refresh failed: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Server refresh failed: ' . $e->getMessage());
        }
    }
}
