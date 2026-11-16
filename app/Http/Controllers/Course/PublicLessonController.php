<?php

namespace App\Http\Controllers\Course;

use App\Http\Controllers\Controller;
use App\Http\Requests\UnlockPublicLessonRequest;
use App\Models\Course\Course;
use App\Models\Course\SectionLesson;
use App\Support\PublicLessonAccess;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

/**
 * Guest (no-login) course lesson viewer, reached only through a course's
 * public share QR/link. Never touches watch history, forums, users, or
 * course progress — this is a read-only, session-scoped unlock gate.
 */
class PublicLessonController extends Controller
{
    public function show(Request $request, Course $course, SectionLesson $lesson)
    {
        if (!$this->isViewable($course, $lesson)) {
            abort(404);
        }

        $unlocked = $this->isUnlocked($request, $course);
        $sections = $unlocked
            ? $course->sections()
                ->with(['section_lessons' => function ($query) {
                    $query->where('status', true)
                        ->whereIn('lesson_type', ['video', 'video_url'])
                        ->orderBy('sort')
                        ->select(['id', 'course_section_id', 'title', 'duration']);
                }])
                ->orderBy('sort')
                ->get(['id', 'title'])
                ->map(fn ($section) => [
                    'id' => $section->id,
                    'title' => $section->title,
                    'lessons' => $section->section_lessons->map(fn ($item) => [
                        'id' => $item->id,
                        'title' => $item->title,
                        'duration' => $item->duration,
                    ])->values(),
                ])->values()
            : [];

        return Inertia::render('public/course-lesson', [
            'course' => [
                'id' => $course->id,
                'title' => $course->title,
            ],
            'lesson' => [
                'id' => $lesson->id,
                'duration' => $lesson->duration,
                'thumbnail' => $lesson->getThumbnailUrl(),
            ],
            'section' => $unlocked
                ? $sections->first(fn ($section) => $section['lessons']->contains(fn ($item) => $item['id'] === $lesson->id))
                : null,
            'sections' => $sections,
            'unlocked' => $unlocked,
            'sources' => $unlocked ? $this->buildSources($lesson) : [],
        ]);
    }

    public function unlock(UnlockPublicLessonRequest $request, Course $course)
    {
        if (!$course->public_share_enabled || $course->status !== 'approved' || !$course->public_share_key_hash) {
            abort(404);
        }

        if (!Hash::check($request->validated()['access_key'], $course->public_share_key_hash)) {
            return back()->withErrors(['access_key' => 'Invalid access key.']);
        }

        // Scope the unlock to this course and this exact key hash, so rotating
        // or disabling the key immediately invalidates every existing session.
        $request->session()->put("public_share.{$course->id}", $course->public_share_key_hash);

        return back()->with('success', 'Unlocked.');
    }

    private function isViewable(Course $course, SectionLesson $lesson): bool
    {
        return PublicLessonAccess::isViewable(
            [
                'id' => $course->id,
                'status' => $course->status,
                'public_share_enabled' => $course->public_share_enabled,
            ],
            [
                'course_id' => $lesson->course_id,
                'status' => $lesson->status,
                'lesson_type' => $lesson->lesson_type,
            ],
        );
    }

    private function isUnlocked(Request $request, Course $course): bool
    {
        if (!$course->public_share_key_hash) {
            return false;
        }

        return $request->session()->get("public_share.{$course->id}") === $course->public_share_key_hash;
    }

    private function buildSources(SectionLesson $lesson): array
    {
        $sources = [];

        if ($lesson->processing_status === 'completed' && $lesson->hls_playlist_path) {
            $sources[] = [
                'src' => $this->absoluteUrl($lesson->hls_playlist_path),
                'type' => 'application/x-mpegURL',
                'label' => 'HLS',
            ];
        }

        if ($lesson->lesson_src) {
            $sources[] = [
                'src' => $this->absoluteUrl($lesson->lesson_src),
                'type' => 'video/mp4',
                'label' => 'MP4',
            ];
        }

        return $sources;
    }

    private function absoluteUrl(string $path): string
    {
        return str_starts_with($path, 'http://') || str_starts_with($path, 'https://')
            ? $path
            : url($path);
    }
}
