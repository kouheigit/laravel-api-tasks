<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskNoteRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {

        return [
            'title'=>'sometimes|string|max:255',
            'content'=>'sometimes|string',
            'status' => 'sometimes|in:Todo,InProgress,Done',
            'due_date'=>'sometimes|date|after_or_equal:today',
            'priority' => 'sometimes|integer|min:1|max:5',
            'task_group_id' => 'nullable|exists:task_groups,id',
        ];
    }
}
