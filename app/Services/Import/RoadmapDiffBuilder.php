<?php

namespace App\Services\Import;

use App\Models\Roadmap;
use App\Models\Topic;

/**
 * @phpstan-import-type Document from RoadmapFileReport
 * @phpstan-import-type TopicDocument from RoadmapFileReport
 *
 * @phpstan-type DiffEntry array{change: 'added'|'changed'|'removed', location: string, topicKey: string, note?: string}
 */
class RoadmapDiffBuilder
{
    private const COMPARED_FIELDS = ['title', 'summary', 'checklist', 'signals', 'ai_prompt', 'review_checks', 'exercise', 'sources'];

    /**
     * @param  Document  $document
     * @return array{entries: list<DiffEntry>, unchangedCount: int, note: string}
     */
    public function build(Roadmap $roadmap, array $document): array
    {
        $existing = $roadmap->topics()
            ->with('group.section')
            ->withCount('studySessions')
            ->get()
            ->keyBy('key');

        $entries = [];
        $unchangedCount = 0;
        $seenKeys = [];

        foreach ($document['sections'] as $sectionIndex => $section) {
            foreach ($section['groups'] as $group) {
                $location = $this->location($sectionIndex, $section['key'], $group['key']);

                foreach ($group['topics'] as $topic) {
                    $seenKeys[] = $topic['key'];
                    $current = $existing->get($topic['key']);
                    $entry = $this->compare($current, $topic, $section['key'], $group['key']);

                    if ($entry === null) {
                        $unchangedCount++;

                        continue;
                    }

                    $entries[] = ['change' => $entry['change'], 'location' => $location, 'topicKey' => $topic['key'], ...($entry['note'] === null ? [] : ['note' => $entry['note']])];
                }
            }
        }

        foreach ($existing as $key => $topic) {
            if (in_array($key, $seenKeys, true) || $topic->archived_at !== null) {
                continue;
            }

            $entries[] = [
                'change' => 'removed',
                'location' => $this->locationOf($topic),
                'topicKey' => (string) $key,
                'note' => $this->archiveNote($topic),
            ];
        }

        return [
            'entries' => $entries,
            'unchangedCount' => $unchangedCount,
            'note' => __('Tópicos que saem do arquivo vão para "arquivados" em vez de serem apagados. Status, revisões e notas dos outros tópicos ficam como estão.'),
        ];
    }

    /**
     * @param  TopicDocument  $incoming
     * @return array{change: 'added'|'changed', note: string|null}|null
     */
    private function compare(?Topic $current, array $incoming, string $sectionKey, string $groupKey): ?array
    {
        if ($current === null) {
            return ['change' => 'added', 'note' => null];
        }

        if ($current->archived_at !== null) {
            return ['change' => 'added', 'note' => __('restaurado')];
        }

        $note = $this->changeNote($current, $incoming, $sectionKey, $groupKey);

        return $note === null ? null : ['change' => 'changed', 'note' => $note];
    }

    /**
     * @param  TopicDocument  $incoming
     */
    private function changeNote(Topic $current, array $incoming, string $sectionKey, string $groupKey): ?string
    {
        if ($current->title !== $incoming['title']) {
            return __('título mudou');
        }

        if ($current->checklist !== $incoming['checklist']) {
            return __('checklist mudou');
        }

        if ($current->group->section->key !== $sectionKey || $current->group->key !== $groupKey) {
            return __('mudou de lugar');
        }

        foreach (self::COMPARED_FIELDS as $field) {
            if ($this->normalizeSignals($current->{$field}) !== $this->normalizeSignals($incoming[$field])) {
                return __('conteúdo mudou');
            }
        }

        return null;
    }

    private function normalizeSignals(mixed $value): mixed
    {
        return $value === '' ? null : $value;
    }

    private function archiveNote(Topic $topic): string
    {
        $sessionCount = (int) $topic->getAttribute('study_sessions_count');

        return match (true) {
            $sessionCount === 0 => __('arquivado'),
            $sessionCount === 1 => __('arquivado: tem 1 sessão'),
            default => __('arquivado: tem :count sessões', ['count' => $sessionCount]),
        };
    }

    private function locationOf(Topic $topic): string
    {
        $section = $topic->group->section;

        return $this->location($section->position, $section->key, $topic->group->key);
    }

    private function location(int $sectionIndex, string $sectionKey, string $groupKey): string
    {
        return sprintf('%02d %s / %s /', $sectionIndex + 1, $sectionKey, $groupKey);
    }
}
