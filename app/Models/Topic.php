<?php

namespace App\Models;

use App\Enums\TopicStatus;
use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property int $roadmap_id
 * @property int $topic_group_id
 * @property string $key
 * @property string $title
 * @property string|null $summary
 * @property list<string> $checklist
 * @property array{bad?: array{code: string, queries: int}, good?: array{code: string, queries: int}}|null $signals
 * @property string|null $ai_prompt
 * @property list<string> $review_checks
 * @property string|null $exercise
 * @property list<array{title: string, url: string}> $sources
 * @property int $position
 * @property TopicStatus $status
 * @property list<int> $checked_items
 * @property string|null $notes
 * @property CarbonImmutable|null $started_on
 * @property CarbonImmutable|null $completed_on
 * @property CarbonImmutable|null $exercise_completed_on
 * @property CarbonImmutable|null $archived_at
 * @property bool|null $has_due_review
 */
class Topic extends Model
{
    protected $guarded = [];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'checklist' => 'array',
            'signals' => 'array',
            'review_checks' => 'array',
            'sources' => 'array',
            'checked_items' => 'array',
            'status' => TopicStatus::class,
            'started_on' => 'date',
            'completed_on' => 'date',
            'exercise_completed_on' => 'date',
            'archived_at' => 'datetime',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'key';
    }

    public function displayStatus(): TopicStatus
    {
        $hasDueReview = $this->has_due_review ?? $this->dueReviews()->exists();

        return $this->status === TopicStatus::Done && $hasDueReview
            ? TopicStatus::Review
            : $this->status;
    }

    /**
     * @param  Builder<Topic>  $query
     */
    public function scopeActive(Builder $query): void
    {
        $query->whereNull('archived_at');
    }

    /**
     * @param  Builder<Topic>  $query
     */
    public function scopeWithDueReviewFlag(Builder $query): void
    {
        $query->withExists(['reviews as has_due_review' => fn (Builder $reviews) => $reviews
            ->whereNull('outcome')
            ->whereDate('due_on', '<=', today())]);
    }

    /**
     * @return BelongsTo<Roadmap, $this>
     */
    public function roadmap(): BelongsTo
    {
        return $this->belongsTo(Roadmap::class);
    }

    /**
     * @return BelongsTo<TopicGroup, $this>
     */
    public function group(): BelongsTo
    {
        return $this->belongsTo(TopicGroup::class, 'topic_group_id');
    }

    /**
     * @return HasMany<StudySession, $this>
     */
    public function studySessions(): HasMany
    {
        return $this->hasMany(StudySession::class);
    }

    /**
     * @return HasMany<Review, $this>
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    /**
     * @return HasMany<Review, $this>
     */
    public function dueReviews(): HasMany
    {
        return $this->reviews()->whereNull('outcome')->whereDate('due_on', '<=', today());
    }
}
