<?php

namespace App\Services\Import;

use App\Models\Roadmap;

/**
 * @phpstan-import-type Document from RoadmapFileReport
 */
class ImportPreviewFactory
{
    public function __construct(
        private readonly RoadmapFileValidator $validator,
        private readonly RoadmapDiffBuilder $diffBuilder,
    ) {}

    /**
     * @return array{kind: 'new'|'update'|'invalid', validation: array<string, mixed>}
     */
    public function make(string $fileName, string $contents): array
    {
        $report = $this->validator->validate($contents);
        $base = [
            'fileName' => $fileName,
            'fileMeta' => __(':size KB', ['size' => max(1, (int) ceil(strlen($contents) / 1024))]),
            'checks' => $report->checks,
        ];

        if ($report->document === null) {
            return ['kind' => 'invalid', 'validation' => $base];
        }

        $roadmap = Roadmap::query()->where('key', $report->document['key'])->first();

        if ($roadmap === null) {
            return ['kind' => 'new', 'validation' => $this->newRoadmap($base, $report->document)];
        }

        return ['kind' => 'update', 'validation' => $this->updatedRoadmap($base, $roadmap, $report->document)];
    }

    /**
     * @param  array<string, mixed>  $base
     * @param  Document  $document
     * @return array<string, mixed>
     */
    private function newRoadmap(array $base, array $document): array
    {
        $preview = [];
        $topicCount = 0;

        foreach ($document['sections'] as $index => $section) {
            $sectionTopicCount = array_sum(array_map(fn (array $group) => count($group['topics']), $section['groups']));
            $topicCount += $sectionTopicCount;
            $preview[] = [
                'number' => sprintf('%02d', $index + 1),
                'name' => $section['title'],
                'topicCount' => $sectionTopicCount,
            ];
        }

        return [
            ...$base,
            'confirmLabel' => __('Importar :count tópicos', ['count' => $topicCount]),
            'preview' => $preview,
        ];
    }

    /**
     * @param  array<string, mixed>  $base
     * @param  Document  $document
     * @return array<string, mixed>
     */
    private function updatedRoadmap(array $base, Roadmap $roadmap, array $document): array
    {
        return [
            ...$base,
            'checks' => [
                ...$base['checks'],
                ['status' => 'ok', 'message' => __('Seu progresso é mantido: as chaves dos tópicos ligam status, notas e revisões')],
            ],
            'confirmLabel' => __('Aplicar mudanças'),
            'match' => ['fileKey' => $roadmap->key, 'roadmapName' => $roadmap->title],
            'diff' => $this->diffBuilder->build($roadmap, $document),
        ];
    }
}
