<?php

use App\Models\Roadmap;
use App\Models\Topic;
use App\Services\Import\RoadmapFileValidator;
use App\Services\Import\RoadmapTemplate;
use Illuminate\Http\UploadedFile;
use Inertia\Testing\AssertableInertia as Assert;

function uploadRoadmap(array|string $contents, string $name = 'laravel.json'): UploadedFile
{
    return UploadedFile::fake()->createWithContent($name, is_string($contents) ? $contents : json_encode($contents));
}

it('previews a valid file as a new roadmap without saving anything', function () {
    $this->post(route('import.preview'), ['file' => uploadRoadmap(roadmapDocument())])->assertRedirect(route('import'));

    $this->get(route('import'))->assertInertia(fn (Assert $page) => $page
        ->where('preview.kind', 'new')
        ->where('preview.validation.fileName', 'laravel.json')
        ->where('preview.validation.confirmLabel', 'Importar 3 tópicos')
        ->where('preview.validation.preview.0', ['number' => '01', 'name' => 'Fundamentos', 'topicCount' => 2]));

    expect(Roadmap::query()->count())->toBe(0);
});

it('reports every problem of an invalid file and saves nothing', function () {
    $document = roadmapDocument();
    $document['sections'][0]['groups'][0]['topics'][1]['key'] = 'ciclo';
    unset($document['sections'][1]['title']);
    $this->post(route('import.preview'), ['file' => uploadRoadmap($document)]);

    $this->get(route('import'))->assertInertia(fn (Assert $page) => $page
        ->where('preview.kind', 'invalid')
        ->has('preview.validation.checks', 2)
        ->where('preview.validation.checks.0.status', 'error'));

    $this->post(route('import.store'))->assertUnprocessable();
    expect(Roadmap::query()->count())->toBe(0);
});

it('rejects a file that is not valid JSON', function () {
    $this->post(route('import.preview'), ['file' => uploadRoadmap('{"format": ')]);

    $this->get(route('import'))->assertInertia(fn (Assert $page) => $page->where('preview.kind', 'invalid'));
});

it('rejects an upload that is not a json file', function () {
    $this->post(route('import.preview'), ['file' => UploadedFile::fake()->create('roadmap.txt', 1)])
        ->assertSessionHasErrors('file');
});

it('imports the previewed file, selects the roadmap and flashes the summary', function () {
    $this->post(route('import.preview'), ['file' => uploadRoadmap(roadmapDocument())]);

    $this->post(route('import.store'))->assertRedirect(route('roadmap'));

    $this->get(route('roadmap'))->assertInertia(fn (Assert $page) => $page
        ->where('title', 'Laravel')
        ->where('importSummary.addedCount', 3)
        ->has('sections', 2));

    expect(Topic::query()->count())->toBe(3)
        ->and(session('import.pending'))->toBeNull();
});

it('does not import a second time from the same pending file', function () {
    $this->post(route('import.preview'), ['file' => uploadRoadmap(roadmapDocument())]);
    $this->post(route('import.store'));

    $this->post(route('import.store'))->assertUnprocessable();
});

it('lets the user cancel a preview', function () {
    $this->post(route('import.preview'), ['file' => uploadRoadmap(roadmapDocument())]);
    $this->delete(route('import.cancel'))->assertRedirect(route('import'));

    $this->get(route('import'))->assertInertia(fn (Assert $page) => $page->where('preview', null));
});

it('recognizes an existing roadmap by key and previews what was added, changed and archived', function () {
    importRoadmap();
    $topic = Topic::query()->where('key', 'metodos')->firstOrFail();
    $topic->studySessions()->create(['studied_on' => today(), 'started_at' => '10:00', 'duration_minutes' => 30, 'activities' => []]);

    $newer = roadmapDocument();
    $newer['sections'][0]['groups'][0]['topics'] = [
        ['key' => 'ciclo', 'title' => 'Ciclo da requisição', 'summary' => 'Resumo', 'checklist' => ['a', 'b', 'c']],
        ['key' => 'cookies', 'title' => 'Cookies', 'summary' => 'Resumo', 'checklist' => ['a']],
    ];
    $this->post(route('import.preview'), ['file' => uploadRoadmap($newer)]);

    $this->get(route('import'))->assertInertia(fn (Assert $page) => $page
        ->where('preview.kind', 'update')
        ->where('preview.validation.match.roadmapName', 'Laravel')
        ->where('preview.validation.diff.unchangedCount', 1)
        ->where('preview.validation.diff.entries', [
            ['change' => 'changed', 'location' => '01 fundamentos / requisicao /', 'topicKey' => 'ciclo', 'note' => 'título mudou'],
            ['change' => 'added', 'location' => '01 fundamentos / requisicao /', 'topicKey' => 'cookies'],
            ['change' => 'removed', 'location' => '01 fundamentos / requisicao /', 'topicKey' => 'metodos', 'note' => 'arquivado: tem 1 sessão'],
        ]));
});

it('keeps progress and archives removed topics when applying an update', function () {
    $roadmap = importRoadmap();
    $ciclo = $roadmap->topics()->where('key', 'ciclo')->firstOrFail();
    $ciclo->update(['status' => 'studying', 'checked_items' => [0, 2], 'notes' => 'minhas notas']);

    $newer = roadmapDocument();
    $newer['sections'][0]['groups'][0]['topics'] = [
        ['key' => 'ciclo', 'title' => 'Ciclo', 'summary' => 'Resumo', 'checklist' => ['a', 'b']],
    ];
    $this->post(route('import.preview'), ['file' => uploadRoadmap($newer)]);
    $this->post(route('import.store'))->assertRedirect(route('roadmap'));

    $ciclo->refresh();
    expect($ciclo->status->value)->toBe('studying')
        ->and($ciclo->notes)->toBe('minhas notas')
        ->and($ciclo->checked_items)->toBe([0])
        ->and($roadmap->topics()->where('key', 'metodos')->firstOrFail()->archived_at)->not->toBeNull()
        ->and(Roadmap::query()->count())->toBe(1);
});

it('provides a model file that passes its own validation', function () {
    $contents = app(RoadmapTemplate::class)->contents();

    expect(app(RoadmapFileValidator::class)->validate($contents)->isValid())->toBeTrue();
    $this->get(route('import.template'))
        ->assertOk()
        ->assertDownload(RoadmapTemplate::FILE_NAME);
});
