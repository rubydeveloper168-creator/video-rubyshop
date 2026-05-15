<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreQuickCourseRequest extends FormRequest
{
    protected function prepareForValidation()
    {
        $user = Auth::user();
        $this->merge([
            'short_description' => $this->short_description ?: $this->title,
            'description'       => $this->description ?: $this->title,
            'pricing_type'      => 'free',
            'status'            => 'approved',
            'level'             => 'beginner',
            'language'          => 'th',
            'expiry_type'       => 'lifetime',
            'drip_content'      => false,
            'discount'          => false,
            'course_category_id'       => (int) $this->course_category_id,
            'course_category_child_id' => $this->course_category_child_id ? (int) $this->course_category_child_id : null,
            'instructor_id'     => $this->instructor_id ? (int) $this->instructor_id : (int) $user?->instructor_id,
        ]);
    }

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'               => 'required|string|max:255',
            'short_description'   => 'required|string',
            'description'         => 'nullable|string',
            'pricing_type'        => 'required|string|in:free,paid',
            'status'              => 'required|string',
            'level'               => 'required|string',
            'language'            => 'required|string|max:255',
            'expiry_type'         => 'required|string',
            'drip_content'        => 'boolean',
            'discount'            => 'boolean',
            'instructor_id'       => 'required|exists:instructors,id',
            'course_category_id'  => 'required|exists:course_categories,id',
            'course_category_child_id' => 'nullable|exists:course_category_children,id',
        ];
    }
}
