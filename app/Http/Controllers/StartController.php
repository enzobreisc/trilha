<?php

namespace App\Http\Controllers;

use App\Models\Roadmap;
use App\Models\StudySession;
use App\Queries\ReviewAgenda;
use App\Queries\RoadmapOverview;
use App\Queries\StudyActivity;
use Inertia\Inertia;
use Inertia\Response;

class StartController extends Controller
{
    private const RECENT_ACTIVITY_LIMIT = 5;

    private const REVIEW_PREVIEW_LIMIT = 4;

    public function index(RoadmapOverview $overview, ReviewAgenda $reviews, StudyActivity $activity): Response
    {
        $roadmaps = Roadmap::query()->active()->orderBy('id')->get();
        $archived = Roadmap::query()->whereNotNull('archived_at')->orderBy('id')->get();

        return Inertia::render('start', [
            'roadmaps' => $roadmaps->map(fn (Roadmap $roadmap) => $overview->summary($roadmap))->all(),
            'archivedRoadmaps' => $archived->map(fn (Roadmap $roadmap) => $overview->managed($roadmap))->all(),
            'reviews' => $reviews->dueSummaries(self::REVIEW_PREVIEW_LIMIT),
            'activity' => $this->recentActivity(),
            'contributionDays' => $activity->contributionDays(),
            'stats' => [
                'streakDays' => $activity->streakDays(),
                'sessionCount' => $activity->sessionCountSinceContributionStart(),
            ],
        ]);
    }

    /**
     * @return array<int, array<string, mixed>>
     */
    private function recentActivity(): array
    {
        return StudySession::query()
            ->with('topic.roadmap')
            ->orderByDesc('studied_on')
            ->orderByDesc('started_at')
            ->limit(self::RECENT_ACTIVITY_LIMIT)
            ->get()
            ->map(fn (StudySession $session) => [
                'id' => (string) $session->id,
                'date' => $session->studied_on->toDateString(),
                'time' => $session->started_at,
                'topicTitle' => $session->topic->title,
                'roadmapId' => $session->topic->roadmap->key,
                'minutes' => $session->duration_minutes,
            ])
            ->all();
    }
}
