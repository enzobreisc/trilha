<?php

namespace App\Actions;

use App\Enums\ReviewOutcome;
use App\Enums\TopicStatus;
use App\Models\Review;
use Illuminate\Support\Facades\DB;

class AnswerReview
{
    public function __construct(private readonly ScheduleReviews $scheduleReviews) {}

    public function handle(Review $review, ReviewOutcome $outcome): void
    {
        DB::transaction(function () use ($review, $outcome) {
            $review->update(['outcome' => $outcome, 'answered_on' => today()]);
            $topic = $review->topic;

            if ($outcome === ReviewOutcome::Again) {
                $topic->update(['status' => TopicStatus::Review]);
                $this->scheduleReviews->scheduleRetry($topic);

                return;
            }

            if ($topic->status === TopicStatus::Review && ! $topic->reviews()->pending()->exists()) {
                $topic->update(['status' => TopicStatus::Done]);
            }
        });
    }

    public function undo(Review $review): void
    {
        DB::transaction(function () use ($review) {
            $topic = $review->topic;
            $retryInDays = (int) config('trilha.failed_review_retry_in_days');

            $topic->reviews()->pending()->where('interval_days', $retryInDays)->where('id', '>', $review->id)->delete();
            $review->update(['outcome' => null, 'answered_on' => null]);
            $topic->update(['status' => $review->interval_days === $retryInDays ? TopicStatus::Review : TopicStatus::Done]);
        });
    }
}
