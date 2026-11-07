<?php

namespace App\Services\Import;

/**
 * @phpstan-type Check array{status: 'ok'|'warn'|'error', message: string, details?: list<array{location: string, note?: string}>, hint?: string}
 * @phpstan-type TopicDocument array{key: string, title: string, summary: string|null, checklist: list<string>, signals: array{bad: string|null, good: string|null}|null, ai_prompt: string|null, review_checks: list<string>, exercise: string|null, sources: list<array{title: string, url: string}>}
 * @phpstan-type GroupDocument array{key: string, title: string, topics: list<TopicDocument>}
 * @phpstan-type SectionDocument array{key: string, title: string, groups: list<GroupDocument>}
 * @phpstan-type Document array{key: string, title: string, sections: list<SectionDocument>}
 */
final readonly class RoadmapFileReport
{
    /**
     * @param  list<Check>  $checks
     * @param  Document|null  $document
     */
    public function __construct(
        public array $checks,
        public ?array $document,
    ) {}

    public function isValid(): bool
    {
        return $this->document !== null;
    }
}
