<?php

namespace App\Actions;

use App\Enums\TopicStatus;
use App\Models\Roadmap;
use App\Models\Section;
use App\Models\Topic;
use App\Models\TopicGroup;
use App\Services\AppSettings;
use App\Services\Import\RoadmapDiffBuilder;
use Illuminate\Support\Facades\DB;

/**
 * @phpstan-import-type Document from \App\Services\Import\RoadmapFileReport
 * @phpstan-import-type TopicDocument from \App\Services\Import\RoadmapFileReport
 */
class ImportRoadmap
{
    public function __construct(
        private readonly AppSettings $settings,
        private readonly RoadmapDiffBuilder $diffBuilder,
    ) {}

    /**
     * @param  Document  $document
     * @return array{fileName: string, addedCount: int, changedCount: int, archivedCount: int}
     */
    public function handle(array $document, string $fileName): array
    {
        return DB::transaction(function () use ($document, $fileName) {
            $existing = Roadmap::query()->where('key', $document['key'])->first();
            $diff = $existing === null ? null : $this->diffBuilder->build($existing, $document);

            $roadmap = $existing ?? new Roadmap(['key' => $document['key'], 'title' => $document['title']]);
            $roadmap->fill(['source_file' => $fileName, 'imported_at' => now()])->save();

            $this->syncTree($roadmap, $document);
            $this->settings->selectRoadmap($roadmap);

            return $this->summarize($fileName, $document, $diff);
        });
    }

    /**
     * @param  Document  $document
     */
    private function syncTree(Roadmap $roadmap, array $document): void
    {
        $seenTopicKeys = [];

        foreach ($document['sections'] as $sectionIndex => $sectionDocument) {
            $section = Section::query()->updateOrCreate(
                ['roadmap_id' => $roadmap->id, 'key' => $sectionDocument['key']],
                ['title' => $sectionDocument['title'], 'position' => $sectionIndex],
            );

            foreach ($sectionDocument['groups'] as $groupIndex => $groupDocument) {
                $group = TopicGroup::query()->updateOrCreate(
                    ['section_id' => $section->id, 'key' => $groupDocument['key']],
                    ['title' => $groupDocument['title'], 'position' => $groupIndex],
                );

                foreach ($groupDocument['topics'] as $topicIndex => $topicDocument) {
                    $seenTopicKeys[] = $topicDocument['key'];
                    $this->syncTopic($roadmap, $group, $topicDocument, $topicIndex);
                }
            }
        }

        $roadmap->topics()->active()->whereNotIn('key', $seenTopicKeys)->update(['archived_at' => now()]);
        $this->deleteEmptyBranches($roadmap);
    }

    /**
     * @param  TopicDocument  $document
     */
    private function syncTopic(Roadmap $roadmap, TopicGroup $group, array $document, int $position): void
    {
        $topic = Topic::query()->firstOrNew(['roadmap_id' => $roadmap->id, 'key' => $document['key']]);

        $topic->fill([
            'topic_group_id' => $group->id,
            'title' => $document['title'],
            'summary' => $document['summary'],
            'checklist' => $document['checklist'],
            'signals' => $document['signals'],
            'ai_prompt' => $document['ai_prompt'],
            'review_checks' => $document['review_checks'],
            'exercise' => $document['exercise'],
            'sources' => $document['sources'],
            'position' => $position,
            'archived_at' => null,
        ]);

        if (! $topic->exists) {
            $topic->fill(['status' => TopicStatus::Todo, 'checked_items' => []]);
        }

        $topic->checked_items = array_values(array_filter(
            $topic->checked_items ?? [],
            fn (int $index) => $index < count($document['checklist']),
        ));
        $topic->save();
    }

    private function deleteEmptyBranches(Roadmap $roadmap): void
    {
        TopicGroup::query()
            ->whereIn('section_id', $roadmap->sections()->select('id'))
            ->whereDoesntHave('topics')
            ->delete();

        $roadmap->sections()->whereDoesntHave('groups')->delete();
    }

    /**
     * @param  Document  $document
     * @param  array{entries: list<array{change: string}>}|null  $diff
     * @return array{fileName: string, addedCount: int, changedCount: int, archivedCount: int}
     */
    private function summarize(string $fileName, array $document, ?array $diff): array
    {
        if ($diff === null) {
            $topicCount = 0;

            foreach ($document['sections'] as $section) {
                foreach ($section['groups'] as $group) {
                    $topicCount += count($group['topics']);
                }
            }

            return ['fileName' => $fileName, 'addedCount' => $topicCount, 'changedCount' => 0, 'archivedCount' => 0];
        }

        $countOf = fn (string $change) => count(array_filter($diff['entries'], fn (array $entry) => $entry['change'] === $change));

        return [
            'fileName' => $fileName,
            'addedCount' => $countOf('added'),
            'changedCount' => $countOf('changed'),
            'archivedCount' => $countOf('removed'),
        ];
    }
}
