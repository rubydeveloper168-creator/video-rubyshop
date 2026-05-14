<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course\SectionLesson;
use App\Services\VideoProcessingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class VideoProcessingController extends Controller
{
    protected VideoProcessingService $videoProcessingService;

    public function __construct(VideoProcessingService $videoProcessingService)
    {
        $this->videoProcessingService = $videoProcessingService;
    }

    /**
     * Handle processing callback from Node.js worker
     */
    public function processingCallback(Request $request): JsonResponse
    {
        Log::info('Received video processing callback', $request->all());

        $validator = Validator::make($request->all(), [
            'video_id' => 'required|integer|exists:section_lessons,id',
            'status' => 'required|in:completed,failed',
            'hls_path' => 'required_if:status,completed|string',
            'thumbnail_path' => 'nullable|string',
            'duration' => 'nullable|integer',
            'resolution' => 'nullable|string',
            'processing_info' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid callback data',
                'errors' => $validator->errors(),
            ], 422);
        }

        $success = $this->videoProcessingService->handleProcessingCallback($request->all());

        return response()->json([
            'success' => $success,
            'message' => $success ? 'Callback processed successfully' : 'Failed to process callback',
        ], $success ? 200 : 500);
    }

    /**
     * Get processing status for a video
     */
    public function getStatus(int $lessonId): JsonResponse
    {
        try {
            $lesson = SectionLesson::findOrFail($lessonId);
            $status = $this->videoProcessingService->getProcessingStatus($lesson);

            return response()->json([
                'success' => true,
                'data' => $status,
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to get processing status',
                'error' => $e->getMessage(),
            ], 404);
        }
    }

    /**
     * Retry failed video processing
     */
    public function retryProcessing(int $lessonId): JsonResponse
    {
        try {
            $lesson = SectionLesson::findOrFail($lessonId);

            if ($lesson->processing_status !== 'failed') {
                return response()->json([
                    'success' => false,
                    'message' => 'Only failed videos can be retried',
                ], 400);
            }

            $success = $this->videoProcessingService->retryProcessing($lesson);

            return response()->json([
                'success' => $success,
                'message' => $success ? 'Video queued for reprocessing' : 'Failed to queue video',
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retry processing',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
