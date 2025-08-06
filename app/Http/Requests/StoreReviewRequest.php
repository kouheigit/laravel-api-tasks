<?php

namespace App\Http\Requests;

use App\Enums\ReviewStatus;
use App\Enums\WorkStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class StoreReviewRequest extends FormRequest
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
            'status'=>['required',new Enum(ReviewStatus::class)],
            'due_date'=>'required|date|after_or_equal:today',
            'product_id'=>'nullable|exists:products,id',

        ];
    }
}
