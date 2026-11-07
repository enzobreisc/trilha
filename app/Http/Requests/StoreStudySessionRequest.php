<?php

namespace App\Http\Requests;

use App\Enums\SessionActivity;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreStudySessionRequest extends FormRequest
{
    public const MAX_DURATION_IN_MINUTES = 1440;

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'topicId' => ['required', 'integer', Rule::exists('topics', 'id')],
            'date' => ['required', 'date_format:Y-m-d', 'before_or_equal:'.today()->toDateString()],
            'durationMinutes' => ['required', 'integer', 'min:1', 'max:'.self::MAX_DURATION_IN_MINUTES],
            'activities' => ['array'],
            'activities.*' => [Rule::enum(SessionActivity::class)],
            'note' => ['nullable', 'string', 'max:2000'],
        ];
    }
}
