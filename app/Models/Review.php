<?php

namespace App\Models;

use App\Enums\ReviewOutcome;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $topic_id
 * @property int $interval_days
 * @property CarbonImmutable $due_on
 * @property ReviewOutcome|null $outcome
 * @property CarbonImmutable|null $answered_on
 */
class Review extends Model
{
    protected $guarded = [];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'due_on' => 'date',
            'answered_on' => 'date',
            'outcome' => ReviewOutcome::class,
        ];
    }

    /**
     * @param  Builder<Review>  $query
     */
    public function scopePending(Builder $query): void
    {
        $query->whereNull('outcome');
    }

    /**
     * @param  Builder<Review>  $query
     */
    public function scopeDue(Builder $query): void
    {
        $query->whereNull('outcome')->whereDate('due_on', '<=', today());
    }

    /**
     * @return BelongsTo<Topic, $this>
     */
    public function topic(): BelongsTo
    {
        return $this->belongsTo(Topic::class);
    }
}
