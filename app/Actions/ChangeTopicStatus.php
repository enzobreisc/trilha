<?php

namespace App\Actions;

use App\Enums\TopicStatus;
use App\Models\Topic;
use Illuminate\Support\Facades\DB;

class ChangeTopicStatus
{
    public function __construct(private readonly ScheduleReviews $scheduleReviews) {}

    public function handle(Topic $topic, TopicStatus $status): void
    {
        DB::transaction(function () use ($topic, $status) {
            $topic->status = $status;

            match ($status) {
                TopicStatus::Todo => $this->reset($topic),
                TopicStatus::Studying => $this->startStudying($topic),
                TopicStatus::Done => $this->complete($topic),
                TopicStatus::Review => $this->sendBackToReview($topic),
            };

            $topic->save();
        });
    }

    private function reset(Topic $topic): void
    {
        $topic->reviews()->pending()->delete();
        $topic->started_on = null;
        $topic->completed_on = null;
    }

    private function startStudying(Topic $topic): void
    {
        $topic->reviews()->pending()->delete();
        $topic->started_on ??= today();
        $topic->completed_on = null;
    }

    private function complete(Topic $topic): void
    {
        $topic->started_on ??= today();
        $topic->completed_on = today();
        $this->scheduleReviews->handle($topic, today());
    }

    private function sendBackToReview(Topic $topic): void
    {
        $topic->started_on ??= today();
        $topic->completed_on ??= today();
        $topic->reviews()->pending()->delete();
        $this->scheduleReviews->scheduleRetry($topic);
    }
}
