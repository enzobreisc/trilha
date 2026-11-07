<?php

namespace App\Http\Controllers;

use App\Models\Section;
use App\Models\Topic;
use App\Queries\TopicTree;
use App\Services\AppSettings;
use Illuminate\Support\Collection;
use Inertia\Inertia;
use Inertia\Response;

class TrailController extends Controller
{
    public function show(AppSettings $settings, TopicTree $tree): Response
    {
        $roadmap = $settings->currentRoadmap();
        abort_if($roadmap === null, 404);

        $sections = $tree->for($roadmap);

        return Inertia::render('roadmap', [
            'title' => $roadmap->title,
            'sourceLabel' => $roadmap->key,
            'sourceFile' => $roadmap->source_file,
            'importedOn' => $roadmap->imported_at->toDateString(),
            'importSummary' => session('importSummary'),
            'sections' => $sections->map(fn (Section $section) => [
                'id' => $section->key,
                'number' => TopicTree::sectionNumber($section),
                'name' => $section->title,
                'groups' => $section->groups->map(fn ($group) => [
                    'name' => $group->title,
                    'topics' => $group->topics->map(fn (Topic $topic) => [
                        'id' => (string) $topic->id,
                        'title' => $topic->title,
                        'status' => $topic->displayStatus()->value,
                        'href' => TopicTree::href($roadmap, $topic),
                        'statusDate' => ($topic->completed_on ?? $topic->started_on)?->toDateString(),
                    ])->all(),
                ])->all(),
            ])->all(),
            'archivedTopics' => $roadmap->topics()->whereNotNull('archived_at')->withCount('studySessions')->get()
                ->map(fn (Topic $topic) => [
                    'id' => (string) $topic->id,
                    'title' => $topic->title,
                    'archivedOn' => $topic->archived_at?->toDateString(),
                    'sessionCount' => (int) $topic->getAttribute('study_sessions_count'),
                ])->all(),
            'expandedSectionIds' => $this->expandedSectionIds($sections),
        ]);
    }

    /**
     * @param  Collection<int, Section>  $sections
     * @return array<int, string>
     */
    private function expandedSectionIds(Collection $sections): array
    {
        $inProgress = $sections->filter(fn (Section $section) => $section->groups->contains(
            fn ($group) => $group->topics->contains(fn (Topic $topic) => $topic->status->value === 'studying'),
        ));

        return ($inProgress->isEmpty() ? $sections->take(1) : $inProgress)->pluck('key')->values()->all();
    }
}
