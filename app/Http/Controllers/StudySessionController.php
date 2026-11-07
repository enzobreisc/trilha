<?php

namespace App\Http\Controllers;

use App\Actions\LogStudySession;
use App\Http\Requests\StoreStudySessionRequest;
use App\Models\Roadmap;
use App\Models\StudySession;
use App\Queries\StudyActivity;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class StudySessionController extends Controller
{
    public function index(StudyActivity $activity): Response
    {
        $week = $activity->week();

        return Inertia::render('sessions', [
            'sessions' => StudySession::query()
                ->with('topic.roadmap')
                ->orderByDesc('studied_on')
                ->orderByDesc('started_at')
                ->get()
                ->map(fn (StudySession $session) => [
                    'id' => (string) $session->id,
                    'roadmapId' => $session->topic->roadmap->key,
                    'topicId' => (string) $session->topic_id,
                    'date' => $session->studied_on->toDateString(),
                    'startTime' => $session->started_at,
                    'durationMinutes' => $session->duration_minutes,
                    'topicTitle' => $session->topic->title,
                    'activities' => $session->activities,
                    'note' => $session->note ?? '',
                ])->all(),
            'stats' => [
                'weekMinutes' => $week['weekMinutes'],
                'totalSessions' => $activity->sessionCountSinceContributionStart(),
                'streakDays' => $activity->streakDays(),
            ],
            'contributionDays' => $activity->contributionDays(),
            'roadmaps' => Roadmap::query()->active()->orderBy('id')->get()
                ->map(fn (Roadmap $roadmap) => ['id' => $roadmap->key, 'name' => $roadmap->title])->all(),
        ]);
    }

    public function store(StoreStudySessionRequest $request, LogStudySession $logStudySession): RedirectResponse
    {
        $logStudySession->handle([
            'topicId' => $request->integer('topicId'),
            'date' => $request->string('date')->toString(),
            'durationMinutes' => $request->integer('durationMinutes'),
            'activities' => array_values((array) $request->input('activities', [])),
            'note' => $request->input('note'),
        ]);

        return back();
    }

    public function update(StoreStudySessionRequest $request, StudySession $session): RedirectResponse
    {
        $session->update([
            'topic_id' => $request->integer('topicId'),
            'studied_on' => $request->string('date')->toString(),
            'duration_minutes' => $request->integer('durationMinutes'),
            'activities' => $request->input('activities', []),
            'note' => $request->input('note'),
        ]);

        return back();
    }

    public function destroy(StudySession $session): RedirectResponse
    {
        $session->delete();

        return back();
    }
}
