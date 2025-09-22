<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;
use App\Enums\TaskStatus;

class StoreTaskItemV2Request extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'status' => ['required', new Enum(TaskStatus::class)],
            'due_date' => 'required|date|after_or_equal:today',
            'priority' => 'integer|min:1|max:5',
            'task_category_v2_id' => 'nullable|exists:task_category_v2s,id',
        ];
    }
}


