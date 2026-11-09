<?php

namespace App\Http\Controllers;

use App\Enums\TopicStatus;
use App\Models\Roadmap;
use App\Models\Section;
use App\Models\Topic;
use App\Queries\ReviewAgenda;
use App\Queries\RoadmapOverview;
use App\Queries\StudyActivity;
use App\Queries\TopicTree;
use App\Services\AppSettings;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    private const REVIEW_LIMIT = 4;

    public function show(
        AppSettings $settings,
        TopicTree $tree,
        RoadmapOverview $overview,
        ReviewAgenda $reviews,
        StudyActivity $activity,
    ): Response {
        $roadmap = $settings->currentRoadmap();
        abort_if($roadmap === null, 404);

        $sections = $tree->for($roadmap);
        $topics = $tree->topics($sections);
        $current = $topics->first(fn (Topic $topic) => $topic->status === TopicStatus::Studying);
        $next = $topics->first(fn (Topic $topic) => $topic->status === TopicStatus::Todo);
        $lastCompleted = $topics->filter(fn (Topic $topic) => $topic->completed_on !== null)->sortByDesc('completed_on')->first();
        $week = $activity->week();

        return Inertia::render('home', [
            'roadmapName' => $roadmap->title,
            'stats' => [
                ...$week,
                'weekCompletedTopics' => $topics->filter(fn (Topic $topic) => $topic->completed_on?->between($week['weekStart'], $week['weekEnd']) === true)->count(),
                'streakDays' => $activity->streakDays(),
            ],
            'progress' => ['done' => $overview->countCompleted($topics), 'total' => $topics->count()],
            'currentTopic' => $current === null ? null : $this->topicInProgress($roadmap, $sections, $current),
            'completedTopicTitle' => $lastCompleted?->title,
            'nextTopic' => $next === null ? null : $this->topicSummary($roadmap, $sections, $next),
            'reviews' => array_map(fn (array $review) => [
                'id' => $review['id'],
                'title' => $review['title'],
                'area' => $review['roadmapTag'],
                'dueIn' => $review['intervalLabel'],
            ], $reviews->dueSummaries(self::REVIEW_LIMIT, $roadmap)),
            'reviewsDueCount' => $reviews->dueCount($roadmap),
        ]);
    }

    /**
     * @param  Collection<int, Section>  $sections
     * @return array{title: string, description: string, breadcrumb: string, href: string}
     */
    private function topicSummary(Roadmap $roadmap, Collection $sections, Topic $topic): array
    {
        $section = $sections->firstOrFail(fn (Section $section) => $section->groups->contains('id', $topic->topic_group_id));

        return [
            'title' => $topic->title,
            'description' => $topic->summary ?? '',
            'breadcrumb' => TopicTree::breadcrumb($section, $section->groups->firstWhere('id', $topic->topic_group_id)),
            'href' => TopicTree::href($roadmap, $topic),
        ];
    }

    /**
     * @param  Collection<int, Section>  $sections
     * @return array<string, mixed>
     */
    private function topicInProgress(Roadmap $roadmap, Collection $sections, Topic $topic): array
    {
        $sessions = $topic->studySessions()->orderByDesc('studied_on')->orderByDesc('started_at')->get();

        return [
            ...$this->topicSummary($roadmap, $sections, $topic),
            'id' => (string) $topic->id,
            'startedOn' => $topic->started_on?->toDateString(),
            'minutesSpent' => (int) $sessions->sum('duration_minutes'),
            'sessionCount' => $sessions->count(),
            'checklist' => collect($topic->checklist)->map(fn (string $label, int $index) => [
                'label' => $label,
                'isDone' => in_array($index, $topic->checked_items, true),
            ])->all(),
        ];
    }
}
