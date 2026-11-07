<?php

use App\Actions\ImportRoadmap;
use App\Models\Roadmap;
use App\Services\Import\RoadmapFileValidator;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

pest()->extend(TestCase::class)
    ->use(RefreshDatabase::class)
    ->beforeEach(fn () => Http::preventStrayRequests())
    ->in('Feature');

/**
 * @return array<string, mixed>
 */
function roadmapDocument(string $key = 'laravel', string $title = 'Laravel'): array
{
    return [
        'format' => 'trilha/v1',
        'key' => $key,
        'title' => $title,
        'sections' => [
            [
                'key' => 'fundamentos',
                'title' => 'Fundamentos',
                'groups' => [[
                    'key' => 'requisicao',
                    'title' => 'Requisição',
                    'topics' => [
                        ['key' => 'ciclo', 'title' => 'Ciclo', 'summary' => 'Resumo', 'checklist' => ['a', 'b', 'c']],
                        ['key' => 'metodos', 'title' => 'Métodos', 'summary' => 'Resumo', 'checklist' => ['a']],
                    ],
                ]],
            ],
            [
                'key' => 'banco',
                'title' => 'Banco',
                'groups' => [[
                    'key' => 'performance',
                    'title' => 'Performance',
                    'topics' => [
                        ['key' => 'n-mais-1', 'title' => 'N+1', 'summary' => 'Resumo', 'checklist' => ['a', 'b']],
                    ],
                ]],
            ],
        ],
    ];
}

function importRoadmap(?array $document = null, string $fileName = 'laravel.json'): Roadmap
{
    $document ??= roadmapDocument();
    $report = app(RoadmapFileValidator::class)->validate(json_encode($document));
    expect($report->isValid())->toBeTrue();

    app(ImportRoadmap::class)->handle($report->document, $fileName);

    return Roadmap::query()->where('key', $document['key'])->firstOrFail();
}
