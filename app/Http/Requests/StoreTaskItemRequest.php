<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskItemRequest extends FormRequest
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
            'title'=>'required|string|max:255',
            'content'=>'required|string',
            'status'=>['required,new Enum(TaskStatus::class)'],
            'due_date'=>'required|date|after_or_equal:today',
            'priority'=>'integer|min:1|max:5',
            'task_category_id'=>'nullable|exists:task_categories,id',
        ];
    }
}
