<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;
use App\Enums\TaskStatus;

class UpdateTaskItemV2Request extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'sometimes|required|string|max:255',
            'content' => 'sometimes|required|string',
            'status' => ['sometimes','required', new Enum(TaskStatus::class)],
            'due_date' => 'sometimes|required|date|after_or_equal:today',
            'priority' => 'sometimes|integer|min:1|max:5',
            'task_category_v2_id' => 'sometimes|nullable|exists:task_category_v2s,id',
        ];
    }
}


