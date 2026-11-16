<?php

namespace App\Support;

/**
 * Pure guest-access rule for the public (no-login) course lesson viewer.
 * Framework-agnostic on purpose so it can be checked without booting the app or a database.
 */
class PublicLessonAccess
{
    /**
     * @param array{id: int|string, status: string, public_share_enabled: bool} $course
     * @param array{course_id: int|string, status: bool, lesson_type: string} $lesson
     */
    public static function isViewable(array $course, array $lesson): bool
    {
        return ($course['public_share_enabled'] ?? false) === true
            && ($course['status'] ?? null) === 'approved'
            && (string) ($lesson['course_id'] ?? null) === (string) ($course['id'] ?? null)
            && ($lesson['status'] ?? false) === true
            && in_array($lesson['lesson_type'] ?? null, ['video', 'video_url'], true);
    }
}
