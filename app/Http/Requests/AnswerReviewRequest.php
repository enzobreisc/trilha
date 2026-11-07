<?php

namespace App\Http\Requests;

use App\Enums\ReviewOutcome;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AnswerReviewRequest extends FormRequest
{
    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'outcome' => ['required', Rule::enum(ReviewOutcome::class)],
        ];
    }
}
