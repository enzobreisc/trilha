<?php

namespace App\Queries;

use App\Models\Roadmap;
use App\Models\Section;
use App\Services\AppSettings;
use App\Services\ProfileName;

class ChromeData
{
    public function __construct(
        private readonly AppSettings $settings,
        private readonly TopicTree $tree,
        private readonly RoadmapOverview $overview,
        private readonly ReviewAgenda $reviews,
        private readonly StudyActivity $activity,
        private readonly ProfileName $profileName,
    ) {}

    /**
     * @return array<string, mixed>
     */
    public function build(): array
    {
        $roadmaps = Roadmap::query()->active()->orderBy('id')->get();
        $current = $this->settings->currentRoadmap();
        $searchTopics = [];
        $options = [];

        foreach ($roadmaps as $roadmap) {
            $sections = $this->tree->for($roadmap);
            $topics = $this->tree->topics($sections);
            $options[] = [
                'id' => $roadmap->key,
                'name' => $roadmap->title,
                'doneTopics' => $this->overview->countCompleted($topics),
                'totalTopics' => $topics->count(),
            ];

            foreach ($sections as $section) {
                $searchTopics = [...$searchTopics, ...$this->searchEntries($roadmap, $section)];
            }
        }

        return [
            'profileName' => $this->profileName->resolve(),
            'roadmaps' => $options,
            'currentRoadmapId' => $current->key ?? '',
            'reviewsDue' => $this->reviews->dueCount(),
            'weekMinutes' => $this->activity->week()['weekMinutes'],
            'topics' => $searchTopics,
        ];
    }

    /**
     * @return list<array<string, mixed>>
     */
    private function searchEntries(Roadmap $roadmap, Section $section): array
    {
        $entries = [];

        foreach ($section->groups as $group) {
            foreach ($group->topics as $topic) {
                $entries[] = [
                    'id' => (string) $topic->id,
                    'title' => $topic->title,
                    'status' => $topic->displayStatus()->value,
                    'href' => TopicTree::href($roadmap, $topic),
                    'roadmapName' => $roadmap->title,
                    'location' => TopicTree::sectionNumber($section).' '.$section->title.' / '.$group->title,
                ];
            }
        }

        return $entries;
    }
}
