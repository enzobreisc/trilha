<?php

namespace App\Http\Requests;

use App\Enums\TopicStatus;
use App\Models\Topic;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateTopicRequest extends FormRequest
{
    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        $topic = $this->route('topic');
        $checklistSize = $topic instanceof Topic ? count($topic->checklist) : 0;

        return [
            'status' => ['sometimes', Rule::enum(TopicStatus::class)],
            'checkedItems' => ['sometimes', 'array'],
            'checkedItems.*' => ['integer', 'min:0', 'max:'.max(0, $checklistSize - 1)],
            'notes' => ['sometimes', 'nullable', 'string', 'max:20000'],
            'isExerciseCompleted' => ['sometimes', 'boolean'],
        ];
    }
}
