<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePageSectionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'active' => 'required|boolean',
            'title' => 'nullable|string|max:255',
            'sub_title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'video_url' => 'nullable|string|max:255',
            'background_image' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            'background_color' => 'nullable|string|max:255',
            'properties' => 'array',
            'translations' => 'nullable|array',
            'translations.th' => 'nullable|array',
            'translations.th.title' => 'nullable|string|max:255',
            'translations.th.sub_title' => 'nullable|string|max:255',
            'translations.th.description' => 'nullable|string',
            'translations.th.properties' => 'nullable|array',
        ];
    }
}
