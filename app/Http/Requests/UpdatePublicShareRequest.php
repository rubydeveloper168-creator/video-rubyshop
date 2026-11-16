<?php

namespace App\Http\Requests;

use App\Models\Course\Course;
use App\Services\Course\CourseService;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdatePublicShareRequest extends FormRequest
{
    /**
     * Only the owning instructor or an admin may manage a course's public share link.
     */
    public function authorize(): bool
    {
        $course = Course::find($this->route('id'));

        if (!$course) {
            return false;
        }

        return app(CourseService::class)->canManagePublicShare($course, Auth::user());
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'access_key' => 'required|string|min:3|max:64',
        ];
    }
}
