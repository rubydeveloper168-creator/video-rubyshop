<?php

namespace App\Services;

use App\Models\Course\SectionLesson;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class VideoProcessingService
{
    protected string $nodeWorkerUrl;

    public function __construct()
    {
        $this->nodeWorkerUrl = config('services.video_processor.url', 'http://localhost:3112');
    }

    /**
     * Queue video for HLS processing
     */
    public function queueForProcessing(SectionLesson $lesson, string $videoPath): bool
    {
        Log::info('🎯 Starting queue process for video', [
            'lesson_id' => $lesson->id,
            'video_path' => $videoPath,
            'node_worker_url' => $this->nodeWorkerUrl,
        ]);

        try {
            // Update lesson status to processing
            $normalizedVideoPath = $this->normalizeVideoPath($videoPath);

            Log::info('🛠 Normalized video path for processing', [
                'lesson_id' => $lesson->id,
                'original_video_path' => $videoPath,
                'normalized_video_path' => $normalizedVideoPath,
            ]);

            $lesson->update([
                'processing_status' => 'processing',
                'original_video_path' => $normalizedVideoPath,
            ]);

            Log::info('📝 Updated lesson status to processing', [
                'lesson_id' => $lesson->id,
            ]);

            // Get absolute path
            $absolutePath = Storage::disk('public')->path($normalizedVideoPath);

            Log::info('📂 Resolved absolute video path', [
                'lesson_id' => $lesson->id,
                'provided_path' => $videoPath,
                'normalized_path' => $normalizedVideoPath,
                'absolute_path' => $absolutePath,
                'file_exists' => file_exists($absolutePath),
            ]);

            if (!file_exists($absolutePath)) {
                throw new \Exception('Video file not found at: ' . $absolutePath);
            }

            // Prepare callback URL
            $callbackUrl = $this->resolveCallbackUrl();

            Log::info('🔗 Prepared callback URL', [
                'callback_url' => $callbackUrl,
            ]);

            // Send to Node.js worker
            Log::info('📤 Sending request to Node.js worker', [
                'url' => "{$this->nodeWorkerUrl}/process-video",
                'payload' => [
                    'video_id' => $lesson->id,
                    'video_path' => $absolutePath,
                    'callback_url' => $callbackUrl,
                ],
            ]);

            $response = Http::timeout(10)->post("{$this->nodeWorkerUrl}/process-video", [
                'video_id' => $lesson->id,
                'video_path' => $absolutePath,
                'callback_url' => $callbackUrl,
            ]);

            Log::info('📥 Received response from Node.js worker', [
                'status_code' => $response->status(),
                'body' => $response->body(),
                'successful' => $response->successful(),
            ]);

            if ($response->successful()) {
                Log::info('✅ Video processing queued successfully', [
                    'lesson_id' => $lesson->id,
                    'video_path' => $videoPath,
                    'response' => $response->json(),
                ]);
                return true;
            }

            throw new \Exception('Failed to queue video processing: ' . $response->body());

        } catch (\Exception $e) {
            Log::error('❌ Failed to queue video for processing', [
                'lesson_id' => $lesson->id,
                'error_message' => $e->getMessage(),
                'error_file' => $e->getFile(),
                'error_line' => $e->getLine(),
                'trace' => $e->getTraceAsString(),
            ]);

            $lesson->update([
                'processing_status' => 'failed',
                'processing_error' => $e->getMessage(),
            ]);

            return false;
        }
    }

    /**
     * Handle processing callback from Node.js worker
     */
    public function handleProcessingCallback(array $data): bool
    {
        Log::info('📨 Received processing callback from Node.js', [
            'data' => $data,
        ]);

        try {
            $lesson = SectionLesson::findOrFail($data['video_id']);

            Log::info('📖 Found lesson for callback', [
                'lesson_id' => $lesson->id,
                'lesson_title' => $lesson->title,
            ]);

            if ($data['status'] === 'completed') {
                $lesson->update([
                    'processing_status' => 'completed',
                    'hls_playlist_path' => $data['hls_path'],
                    'thumbnail' => $data['thumbnail_path'] ?? $lesson->thumbnail,
                    'duration' => $data['duration'] ?? $lesson->duration,
                    'video_resolution' => $data['resolution'] ?? null,
                    'video_segments' => $data['processing_info']['segments_created'] ?? null,
                    'processed_at' => now(),
                    'processing_error' => null,
                ]);

                Log::info('✅ Video processing completed successfully', [
                    'lesson_id' => $lesson->id,
                    'hls_path' => $data['hls_path'],
                    'thumbnail_path' => $data['thumbnail_path'] ?? 'none',
                    'duration' => $data['duration'] ?? 'unknown',
                    'resolution' => $data['resolution'] ?? 'unknown',
                    'segments' => $data['processing_info']['segments_created'] ?? 0,
                ]);

                return true;
            }

            // Handle failure
            $lesson->update([
                'processing_status' => 'failed',
                'processing_error' => $data['processing_info']['error'] ?? 'Unknown error',
            ]);

            Log::error('❌ Video processing failed (from callback)', [
                'lesson_id' => $lesson->id,
                'error' => $data['processing_info']['error'] ?? 'Unknown error',
            ]);

            return false;

        } catch (\Exception $e) {
            Log::error('❌ Failed to handle processing callback', [
                'error_message' => $e->getMessage(),
                'data' => $data,
                'trace' => $e->getTraceAsString(),
            ]);

            return false;
        }
    }

    /**
     * Get processing status
     */
    public function getProcessingStatus(SectionLesson $lesson): array
    {
        return [
            'status' => $lesson->processing_status,
            'is_processing' => $lesson->isProcessing(),
            'is_completed' => $lesson->isHLS(),
            'error' => $lesson->processing_error,
            'video_url' => $lesson->getVideoUrl(),
            'thumbnail_url' => $lesson->getThumbnailUrl(),
            'segments' => $lesson->video_segments,
            'resolution' => $lesson->video_resolution,
            'processed_at' => $lesson->processed_at?->toISOString(),
        ];
    }

    /**
     * Retry failed processing
     */
    public function retryProcessing(SectionLesson $lesson): bool
    {
        if (!$lesson->original_video_path) {
            return false;
        }

        return $this->queueForProcessing($lesson, $lesson->original_video_path);
    }

    /**
     * Normalize an uploaded video path (URL or relative path) so it can be resolved locally.
     */
    protected function normalizeVideoPath(string $videoPath): string
    {
        $normalizedPath = $videoPath;

        if (filter_var($videoPath, FILTER_VALIDATE_URL)) {
            $parsedPath = parse_url($videoPath, PHP_URL_PATH) ?? '';
            $normalizedPath = $parsedPath !== '' ? $parsedPath : $videoPath;
        }

        $normalizedPath = ltrim($normalizedPath, '/');

        if (str_starts_with($normalizedPath, 'storage/')) {
            $normalizedPath = substr($normalizedPath, strlen('storage/'));
        }

        return $normalizedPath;
    }

    /**
     * Resolve the callback URL for the Node.js worker, with graceful fallback.
     */
    protected function resolveCallbackUrl(): string
    {
        $fallback = url('/api/video/processing-callback');

        try {
            $callbackUrl = route('api.video.processing-callback');

            if ($callbackUrl) {
                return $callbackUrl;
            }
        } catch (\Throwable $e) {
            Log::warning('⚠️ Callback route not found, using fallback URL', [
                'error' => $e->getMessage(),
                'fallback_url' => $fallback,
            ]);
        }

        return $fallback;
    }
}
