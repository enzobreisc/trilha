<?php

namespace App\Queries;

use App\Enums\TopicStatus;
use App\Models\Roadmap;
use App\Models\StudySession;
use App\Models\Topic;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class RoadmapOverview
{
    public function __construct(private readonly TopicTree $tree) {}

    /**
     * @return array<string, mixed>
     */
    public function summary(Roadmap $roadmap): array
    {
        $sections = $this->tree->for($roadmap);
        $topics = $this->tree->topics($sections);
        $current = $this->currentTopic($topics) ?? $topics->last();
        $currentSection = $current === null ? null : $sections->first(fn ($section) => $section->groups->contains('id', $current->topic_group_id));
        $currentGroup = $currentSection?->groups->firstWhere('id', $current?->topic_group_id);
        $lastStudiedOn = StudySession::query()->whereHas('topic', fn ($topics) => $topics->where('roadmap_id', $roadmap->id))->max('studied_on');

        return [
            'id' => $roadmap->key,
            'name' => $roadmap->title,
            'subtitle' => $roadmap->source_file,
            'totalTopics' => $topics->count(),
            'doneTopics' => $this->countCompleted($topics),
            'currentTopic' => [
                'title' => $current->title ?? '',
                'section' => $currentSection === null || $currentGroup === null ? '' : TopicTree::breadcrumb($currentSection, $currentGroup),
                'href' => $current === null ? '' : TopicTree::href($roadmap, $current),
            ],
            'reviewsDue' => $this->countDueReviews($topics),
            'management' => $this->managed($roadmap),
            'lastStudiedDaysAgo' => $lastStudiedOn === null ? null : (int) today()->diffInDays(today()->parse($lastStudiedOn)),
        ];
    }

    /**
     * @return array<string, mixed>
     */
    public function managed(Roadmap $roadmap): array
    {
        $topics = $this->tree->topics($this->tree->for($roadmap));

        return [
            'id' => $roadmap->key,
            'name' => $roadmap->title,
            'slug' => Str::slug($roadmap->title),
            'key' => $roadmap->key,
            'originFile' => $roadmap->source_file,
            'importedAt' => $roadmap->imported_at->toDateString(),
            'completedTopics' => $this->countCompleted($topics),
            'totalTopics' => $topics->count(),
            'sessionCount' => StudySession::query()->whereHas('topic', fn ($query) => $query->where('roadmap_id', $roadmap->id))->count(),
            'noteCount' => $roadmap->topics()->whereNotNull('notes')->where('notes', '!=', '')->count(),
            'isArchived' => $roadmap->archived_at !== null,
        ];
    }

    /**
     * @param  Collection<int, Topic>  $topics
     */
    public function currentTopic(Collection $topics): ?Topic
    {
        return $topics->first(fn (Topic $topic) => $topic->status === TopicStatus::Studying)
            ?? $topics->first(fn (Topic $topic) => $topic->status === TopicStatus::Todo);
    }

    /**
     * @param  Collection<int, Topic>  $topics
     */
    public function countCompleted(Collection $topics): int
    {
        return $topics->filter(fn (Topic $topic) => in_array($topic->displayStatus(), [TopicStatus::Done, TopicStatus::Review], true))->count();
    }

    /**
     * @param  Collection<int, Topic>  $topics
     */
    public function countDueReviews(Collection $topics): int
    {
        return $topics->filter(fn (Topic $topic) => $topic->displayStatus() === TopicStatus::Review)->count();
    }
}
