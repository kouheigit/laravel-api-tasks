<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TodoStoreRequest extends FormRequest
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
            'title'=>['required','string','max:255'],
            'description'=>['required','nullable','string'],
            'todo_status_id'=>['required','exists:todo_statuses,id'],
            'todo_priority_id'  => ['required', 'exists:todo_priorities,id'],
        ];
    }
    public function messages(): array
    {
        return [
            'title.required' => 'タイトルは必須です。',
            'description.required' => '内容は必須です。',
            'todo_status_id.required' => 'ステータスを選択してください。',
            'todo_status_id.exists' => '選択したステータスが不正です。',
            'todo_priority_id.required' => '優先度を選択してください。',
            'todo_priority_id.exists' => '選択した優先度が不正です。',
        ];
    }
}
