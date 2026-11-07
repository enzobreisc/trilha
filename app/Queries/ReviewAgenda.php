<?php

namespace App\Queries;

use App\Models\Review;
use App\Models\Roadmap;
use Illuminate\Database\Eloquent\Builder;

class ReviewAgenda
{
    public const CALENDAR_DAYS = 14;

    private const UPCOMING_LIMIT = 8;

    public function dueCount(): int
    {
        return $this->visible(Review::query()->due())->count();
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function dueItems(): array
    {
        return $this->visible(Review::query()->due())
            ->with('topic.group.section', 'topic.roadmap')
            ->orderBy('due_on')
            ->orderBy('id')
            ->get()
            ->map(fn (Review $review) => [
                'id' => (string) $review->id,
                'title' => $review->topic->title,
                'roadmapId' => $review->topic->roadmap->key,
                'path' => TopicTree::breadcrumb($review->topic->group->section, $review->topic->group),
                'summary' => $review->topic->summary ?? '',
                'interval' => $this->intervalLabel($review),
                'topicHref' => TopicTree::href($review->topic->roadmap, $review->topic),
            ])
            ->all();
    }

    /**
     * @return list<array{date: string, count: int, isToday?: bool}>
     */
    public function calendar(): array
    {
        $countsByDate = $this->visible(Review::query()->pending())
            ->whereDate('due_on', '<', today()->addDays(self::CALENDAR_DAYS))
            ->get()
            ->countBy(fn (Review $review) => max($review->due_on, today())->toDateString());

        return array_map(function (int $offset) use ($countsByDate) {
            $date = today()->addDays($offset)->toDateString();

            return ['date' => $date, 'count' => (int) $countsByDate->get($date, 0), ...($offset === 0 ? ['isToday' => true] : [])];
        }, range(0, self::CALENDAR_DAYS - 1));
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    public function upcoming(): array
    {
        return $this->visible(Review::query()->pending())
            ->whereDate('due_on', '>', today())
            ->with('topic.roadmap')
            ->orderBy('due_on')
            ->orderBy('id')
            ->limit(self::UPCOMING_LIMIT)
            ->get()
            ->map(fn (Review $review) => [
                'date' => $review->due_on->toDateString(),
                'title' => $review->topic->title,
                'roadmapId' => $review->topic->roadmap->key,
                'roadmapName' => $review->topic->roadmap->title,
                'interval' => $this->intervalLabel($review),
            ])
            ->all();
    }

    /**
     * @return array<int, array{id: string, title: string, roadmapTag: string, intervalLabel: string}>
     */
    public function dueSummaries(int $limit, ?Roadmap $roadmap = null): array
    {
        return $this->visible(Review::query()->due())
            ->when($roadmap, fn (Builder $query) => $query->whereHas('topic', fn (Builder $topics) => $topics->where('roadmap_id', $roadmap?->id)))
            ->with('topic.roadmap')
            ->orderBy('due_on')
            ->orderBy('id')
            ->limit($limit)
            ->get()
            ->map(fn (Review $review) => [
                'id' => (string) $review->id,
                'title' => $review->topic->title,
                'roadmapTag' => $review->topic->roadmap->key,
                'intervalLabel' => $this->intervalLabel($review),
            ])
            ->all();
    }

    public function intervalLabel(Review $review): string
    {
        return $review->interval_days.'d';
    }

    /**
     * @param  Builder<Review>  $query
     * @return Builder<Review>
     */
    private function visible(Builder $query): Builder
    {
        return $query->whereHas('topic', fn (Builder $topics) => $topics
            ->whereNull('archived_at')
            ->whereHas('roadmap', fn (Builder $roadmaps) => $roadmaps->whereNull('archived_at')));
    }
}
