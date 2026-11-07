<?php

namespace App\Services\Import;

/**
 * @phpstan-import-type Check from RoadmapFileReport
 * @phpstan-import-type Document from RoadmapFileReport
 * @phpstan-import-type TopicDocument from RoadmapFileReport
 */
class RoadmapFileValidator
{
    private const KEY_PATTERN = '/^[a-z0-9]+(?:-[a-z0-9]+)*$/';

    /** @var list<array{message: string, details: list<array{location: string}>}> */
    private array $errors = [];

    /** @var list<array{location: string, note: string}> */
    private array $warnings = [];

    public function validate(string $contents): RoadmapFileReport
    {
        $this->errors = [];
        $this->warnings = [];

        $decoded = json_decode($contents, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            return $this->failed(__('JSON inválido: :reason', ['reason' => json_last_error_msg()]));
        }

        if (! is_array($decoded) || array_is_list($decoded)) {
            return $this->failed(__('A raiz do arquivo precisa ser um objeto'));
        }

        $document = $this->normalizeDocument($decoded);

        $this->reportDuplicateKeys($document);

        if ($this->errors !== []) {
            return new RoadmapFileReport($this->failureChecks(), null);
        }

        /** @var Document $document */
        return new RoadmapFileReport($this->successChecks($document), $document);
    }

    /**
     * @param  array<mixed>  $root
     * @return array<string, mixed>
     */
    private function normalizeDocument(array $root): array
    {
        if (($root['format'] ?? null) !== config('trilha.roadmap_format')) {
            $this->addError(__('Formato desconhecido: o campo "format" precisa ser :format', [
                'format' => (string) config('trilha.roadmap_format'),
            ]));
        }

        return [
            'key' => $this->readKey($root, ''),
            'title' => $this->readTitle($root, ''),
            'sections' => $this->readList($root, 'sections', '', fn (array $section, string $path) => [
                'key' => $this->readKey($section, $path),
                'title' => $this->readTitle($section, $path),
                'groups' => $this->readList($section, 'groups', $path, fn (array $group, string $groupPath) => [
                    'key' => $this->readKey($group, $groupPath),
                    'title' => $this->readTitle($group, $groupPath),
                    'topics' => $this->readList($group, 'topics', $groupPath, fn (array $topic, string $topicPath) => $this->normalizeTopic($topic, $topicPath, $section['key'] ?? '?', $group['key'] ?? '?')),
                ]),
            ]),
        ];
    }

    /**
     * @param  array<mixed>  $topic
     * @return TopicDocument
     */
    private function normalizeTopic(array $topic, string $path, mixed $sectionKey, mixed $groupKey): array
    {
        $normalized = [
            'key' => $this->readKey($topic, $path),
            'title' => $this->readTitle($topic, $path),
            'summary' => $this->readOptionalString($topic, 'summary', $path),
            'checklist' => $this->readStringList($topic, 'checklist', $path),
            'signals' => $this->readSignals($topic, $path),
            'ai_prompt' => $this->readOptionalString($topic, 'ai_prompt', $path),
            'review_checks' => $this->readStringList($topic, 'review_checks', $path),
            'exercise' => $this->readOptionalString($topic, 'exercise', $path),
            'sources' => $this->readSources($topic, $path),
        ];

        $location = sprintf('%s / %s / %s', $sectionKey, $groupKey, $normalized['key']);

        if ($normalized['summary'] === null) {
            $this->warnings[] = ['location' => $location, 'note' => __('sem summary')];
        }

        if ($normalized['checklist'] === []) {
            $this->warnings[] = ['location' => $location, 'note' => __('sem checklist')];
        }

        return $normalized;
    }

    /**
     * @param  array<mixed>  $node
     */
    private function readKey(array $node, string $path): string
    {
        $key = $node['key'] ?? null;

        if (! is_string($key) || trim($key) === '') {
            $this->addError(__(':path: falta o campo ":field"', ['path' => $this->label($path), 'field' => 'key']));

            return '';
        }

        if (preg_match(self::KEY_PATTERN, $key) !== 1) {
            $this->addError(__(':path: a chave ":key" precisa estar em kebab-case', ['path' => $this->label($path), 'key' => $key]));
        }

        return $key;
    }

    /**
     * @param  array<mixed>  $node
     */
    private function readTitle(array $node, string $path): string
    {
        $title = $node['title'] ?? null;

        if (! is_string($title) || trim($title) === '') {
            $this->addError(__(':path: falta o campo ":field"', ['path' => $this->label($path), 'field' => 'title']));

            return '';
        }

        return trim($title);
    }

    /**
     * @param  array<mixed>  $node
     */
    private function readOptionalString(array $node, string $field, string $path): ?string
    {
        $value = $node[$field] ?? null;

        if ($value === null) {
            return null;
        }

        if (! is_string($value)) {
            $this->addError(__(':path: o campo ":field" precisa ser um texto', ['path' => $this->label($path), 'field' => $field]));

            return null;
        }

        return trim($value) === '' ? null : $value;
    }

    /**
     * @param  array<mixed>  $node
     * @return list<string>
     */
    private function readStringList(array $node, string $field, string $path): array
    {
        $value = $node[$field] ?? [];

        if (! is_array($value) || ! array_is_list($value) || array_filter($value, fn ($item) => ! is_string($item)) !== []) {
            $this->addError(__(':path: o campo ":field" precisa ser uma lista de textos', ['path' => $this->label($path), 'field' => $field]));

            return [];
        }

        /** @var list<string> $value */
        return $value;
    }

    /**
     * @param  array<mixed>  $node
     * @return array{bad: string|null, good: string|null}|null
     */
    private function readSignals(array $node, string $path): ?array
    {
        $signals = $node['signals'] ?? null;

        if ($signals === null) {
            return null;
        }

        if (! is_array($signals) || array_is_list($signals)) {
            $this->addError(__(':path: o campo ":field" precisa ter "bad" e "good"', ['path' => $this->label($path), 'field' => 'signals']));

            return null;
        }

        return [
            'bad' => $this->readOptionalString($signals, 'bad', $path.'.signals'),
            'good' => $this->readOptionalString($signals, 'good', $path.'.signals'),
        ];
    }

    /**
     * @param  array<mixed>  $node
     * @return list<array{title: string, url: string}>
     */
    private function readSources(array $node, string $path): array
    {
        $sources = $node['sources'] ?? [];

        if (! is_array($sources) || ! array_is_list($sources)) {
            $this->addError(__(':path: o campo ":field" precisa ser uma lista', ['path' => $this->label($path), 'field' => 'sources']));

            return [];
        }

        $valid = [];

        foreach ($sources as $index => $source) {
            $sourcePath = sprintf('%s.sources[%d]', $path, $index);
            $title = is_array($source) ? ($source['title'] ?? null) : null;
            $url = is_array($source) ? ($source['url'] ?? null) : null;

            if (! is_string($title) || trim($title) === '' || ! is_string($url) || preg_match('#^https?://#i', $url) !== 1) {
                $this->addError(__(':path: precisa de "title" e de uma "url" http ou https', ['path' => $this->label($sourcePath)]));

                continue;
            }

            $valid[] = ['title' => $title, 'url' => $url];
        }

        return $valid;
    }

    /**
     * @param  array<mixed>  $node
     * @param  callable(array<mixed>, string): array<string, mixed>  $normalizeItem
     * @return list<array<string, mixed>>
     */
    private function readList(array $node, string $field, string $path, callable $normalizeItem): array
    {
        $items = $node[$field] ?? null;
        $listPath = $path === '' ? $field : $path.'.'.$field;

        if (! is_array($items) || ! array_is_list($items) || $items === []) {
            $this->addError(__(':path: precisa ser uma lista com pelo menos um item', ['path' => $listPath]));

            return [];
        }

        $normalized = [];

        foreach ($items as $index => $item) {
            $itemPath = sprintf('%s[%d]', $listPath, $index);

            if (! is_array($item) || array_is_list($item)) {
                $this->addError(__(':path: precisa ser um objeto', ['path' => $itemPath]));

                continue;
            }

            $normalized[] = $normalizeItem($item, $itemPath);
        }

        return $normalized;
    }

    /**
     * @param  array<string, mixed>  $document
     */
    private function reportDuplicateKeys(array $document): void
    {
        $sections = is_array($document['sections']) ? $document['sections'] : [];
        $sectionLocations = [];
        $topicLocations = [];

        foreach ($sections as $section) {
            $sectionLocations[$section['key']][] = $section['key'];
            $groupLocations = [];

            foreach ($section['groups'] as $group) {
                $groupLocations[$group['key']][] = $section['key'].' / '.$group['key'];

                foreach ($group['topics'] as $topic) {
                    $topicLocations[$topic['key']][] = $section['key'].' / '.$group['key'];
                }
            }

            $this->addDuplicates($groupLocations);
        }

        $this->addDuplicates($sectionLocations);
        $this->addDuplicates($topicLocations);
    }

    /**
     * @param  array<int|string, list<string>>  $locationsByKey
     */
    private function addDuplicates(array $locationsByKey): void
    {
        foreach ($locationsByKey as $key => $locations) {
            if ($key === '' || count($locations) < 2) {
                continue;
            }

            $this->errors[] = [
                'message' => __('Chave repetida: :key aparece em :count lugares', ['key' => (string) $key, 'count' => count($locations)]),
                'details' => array_map(fn (string $location) => ['location' => $location], $locations),
            ];
        }
    }

    /**
     * @param  Document  $document
     * @return list<Check>
     */
    private function successChecks(array $document): array
    {
        $sectionCount = count($document['sections']);
        $groupCount = 0;
        $topicCount = 0;

        foreach ($document['sections'] as $section) {
            $groupCount += count($section['groups']);

            foreach ($section['groups'] as $group) {
                $topicCount += count($group['topics']);
            }
        }

        $checks = [
            ['status' => 'ok', 'message' => __('JSON válido, formato trilha/v1')],
            ['status' => 'ok', 'message' => __(':sections seções, :groups grupos, :topics tópicos', [
                'sections' => $sectionCount,
                'groups' => $groupCount,
                'topics' => $topicCount,
            ])],
            ['status' => 'ok', 'message' => __('Chaves únicas em todos os níveis')],
        ];

        return [...$checks, ...$this->warningChecks()];
    }

    /**
     * @return list<Check>
     */
    private function failureChecks(): array
    {
        $checks = array_map(fn (array $error) => [
            'status' => 'error',
            'message' => $error['message'],
            ...($error['details'] === [] ? [] : ['details' => $error['details']]),
        ], $this->errors);

        return [...$checks, ...$this->warningChecks()];
    }

    /**
     * @return list<Check>
     */
    private function warningChecks(): array
    {
        if ($this->warnings === []) {
            return [];
        }

        return [[
            'status' => 'warn',
            'message' => __(':count avisos, nada que impeça a importação', ['count' => count($this->warnings)]),
            'details' => $this->warnings,
        ]];
    }

    private function failed(string $message): RoadmapFileReport
    {
        return new RoadmapFileReport([['status' => 'error', 'message' => $message]], null);
    }

    private function addError(string $message): void
    {
        $this->errors[] = ['message' => $message, 'details' => []];
    }

    private function label(string $path): string
    {
        return $path === '' ? __('arquivo') : $path;
    }
}
