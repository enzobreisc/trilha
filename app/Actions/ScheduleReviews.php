<?php

namespace App\Actions;

use App\Models\Topic;
use Carbon\CarbonImmutable;

class ScheduleReviews
{
    public function handle(Topic $topic, CarbonImmutable $completedOn): void
    {
        $topic->reviews()->pending()->delete();

        /** @var list<int> $intervals */
        $intervals = config('trilha.review_intervals_in_days');

        foreach ($intervals as $days) {
            $topic->reviews()->create([
                'interval_days' => $days,
                'due_on' => $completedOn->addDays($days),
            ]);
        }
    }

    public function scheduleRetry(Topic $topic): void
    {
        $retryInDays = (int) config('trilha.failed_review_retry_in_days');

        $topic->reviews()->create([
            'interval_days' => $retryInDays,
            'due_on' => today()->addDays($retryInDays),
        ]);
    }
}
