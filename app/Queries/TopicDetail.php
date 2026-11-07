<?php

namespace App\Queries;

use App\Models\Review;
use App\Models\Roadmap;
use App\Models\StudySession;
use App\Models\Topic;

class TopicDetail
{
    /**
     * @return array<string, mixed>
     */
    public function for(Roadmap $roadmap, Topic $topic): array
    {
        $topic->loadMissing('group.section');
        $section = $topic->group->section;

        return [
            'id' => (string) $topic->id,
            'key' => $topic->key,
            'title' => $topic->title,
            'path' => [$roadmap->title, TopicTree::sectionNumber($section).' '.$section->key, $topic->group->key],
            'status' => $topic->displayStatus()->value,
            'summary' => $topic->summary,
            'checklist' => $topic->checklist,
            'checkedItems' => $topic->checked_items,
            'signals' => $topic->signals,
            'aiPrompt' => $topic->ai_prompt,
            'reviewChecks' => $topic->review_checks,
            'exercise' => $topic->exercise === null ? null : [
                'text' => $topic->exercise,
                'completedOn' => $topic->exercise_completed_on?->toDateString(),
            ],
            'sources' => $topic->sources,
            'notes' => $topic->notes ?? '',
            'startedOn' => $topic->started_on?->toDateString(),
            'completedOn' => $topic->completed_on?->toDateString(),
            'sessions' => $topic->studySessions()->orderByDesc('studied_on')->orderByDesc('started_at')->get()
                ->map(fn (StudySession $session) => [
                    'id' => (string) $session->id,
                    'date' => $session->studied_on->toDateString(),
                    'time' => $session->started_at,
                    'minutes' => $session->duration_minutes,
                    'activities' => $session->activities,
                    'note' => $session->note,
                ])->all(),
            'reviews' => $topic->reviews()->orderBy('due_on')->orderBy('id')->get()
                ->map(fn (Review $review) => [
                    'id' => (string) $review->id,
                    'intervalDays' => $review->interval_days,
                    'dueOn' => $review->due_on->toDateString(),
                    'outcome' => $review->outcome?->value,
                ])->all(),
            'reviewIntervals' => config('trilha.review_intervals_in_days'),
            'updateUrl' => route('topics.update', [$roadmap, $topic], absolute: false),
        ];
    }
}
