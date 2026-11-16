<?php

namespace App\Http\Controllers\Course;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdatePublicShareRequest;
use App\Models\Course\Course;
use App\Services\Course\CourseService;
use Illuminate\Support\Facades\Auth;

class CoursePublicShareController extends Controller
{
    public function __construct(
        protected CourseService $courseService,
    ) {}

    /**
     * Enable public sharing for the course and (re)set its access key.
     */
    public function update(UpdatePublicShareRequest $request, string $id)
    {
        $course = Course::findOrFail($id);

        $this->courseService->savePublicShareKey($course, $request->validated()['access_key']);

        return back()->with('success', 'Public link enabled. Previously unlocked visitors will need the new key.');
    }

    /**
     * Disable public sharing for the course.
     */
    public function destroy(string $id)
    {
        $course = Course::findOrFail($id);

        abort_unless($this->courseService->canManagePublicShare($course, Auth::user()), 403);

        $this->courseService->disablePublicShare($course);

        return back()->with('success', 'Public link disabled.');
    }
}
