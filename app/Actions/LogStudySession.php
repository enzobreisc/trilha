<?php

namespace App\Actions;

use App\Enums\TopicStatus;
use App\Models\StudySession;
use App\Models\Topic;
use Carbon\CarbonImmutable;

class LogStudySession
{
    /**
     * @param  array{topicId: int, date: string, durationMinutes: int, activities?: list<string>, note?: string|null}  $details
     */
    public function handle(array $details): StudySession
    {
        $topic = Topic::query()->findOrFail($details['topicId']);
        $studiedOn = CarbonImmutable::parse($details['date']);

        $session = $topic->studySessions()->create([
            'studied_on' => $studiedOn,
            'started_at' => now()->format('H:i'),
            'duration_minutes' => $details['durationMinutes'],
            'activities' => $details['activities'] ?? [],
            'note' => $details['note'] ?? null,
        ]);

        $this->markAsStarted($topic, $studiedOn);

        return $session;
    }

    private function markAsStarted(Topic $topic, CarbonImmutable $studiedOn): void
    {
        if ($topic->status === TopicStatus::Todo) {
            $topic->status = TopicStatus::Studying;
        }

        if ($topic->started_on === null || $topic->started_on->greaterThan($studiedOn)) {
            $topic->started_on = $studiedOn;
        }

        $topic->save();
    }
}
