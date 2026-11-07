<?php

use App\Models\Roadmap;
use App\Services\AppSettings;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->roadmap = importRoadmap();
});

it('shares the chrome with the roadmaps, the current one and the searchable topics', function () {
    $this->get(route('dashboard'))->assertInertia(fn (Assert $page) => $page
        ->where('chrome.currentRoadmapId', 'laravel')
        ->where('chrome.reviewsDue', 0)
        ->where('chrome.roadmaps.0', ['id' => 'laravel', 'name' => 'Laravel', 'doneTopics' => 0, 'totalTopics' => 3])
        ->where('chrome.topics.0.title', 'Ciclo')
        ->where('chrome.topics.0.href', '/roadmaps/laravel/topics/ciclo')
        ->where('chrome.topics.0.location', '01 Fundamentos / Requisição')
        ->has('today'));
});

it('switches the current roadmap and opens its dashboard', function () {
    $other = importRoadmap(roadmapDocument('outro', 'Outro'), 'outro.json');
    expect(app(AppSettings::class)->currentRoadmap()?->is($other))->toBeTrue();

    $this->put(route('roadmaps.select', $this->roadmap))->assertRedirect(route('dashboard'));

    $this->get(route('dashboard'))->assertInertia(fn (Assert $page) => $page
        ->where('roadmapName', 'Laravel')
        ->where('chrome.currentRoadmapId', 'laravel'));
});

it('renames a roadmap without touching its key', function () {
    $this->put(route('roadmaps.update', $this->roadmap), ['title' => '  Laravel por dentro '])->assertRedirect();

    expect($this->roadmap->refresh()->title)->toBe('Laravel por dentro')
        ->and($this->roadmap->key)->toBe('laravel');
    $this->put(route('roadmaps.update', $this->roadmap), ['title' => ''])->assertSessionHasErrors('title');
});

it('archives a roadmap, hides it from the app and brings it back', function () {
    $this->put(route('roadmaps.archive', $this->roadmap))->assertRedirect(route('start'));

    $this->get(route('roadmap'))->assertRedirect(route('start'));
    $this->get(route('start'))->assertInertia(fn (Assert $page) => $page
        ->where('roadmaps', [])
        ->where('archivedRoadmaps.0.id', 'laravel'));

    $this->delete(route('roadmaps.unarchive', $this->roadmap))->assertRedirect(route('start'));
    $this->get(route('roadmap'))->assertOk();
});

it('deletes a roadmap with everything under it only when the name is typed', function () {
    $topic = $this->roadmap->topics()->firstOrFail();
    $topic->studySessions()->create(['studied_on' => today(), 'started_at' => '10:00', 'duration_minutes' => 30, 'activities' => []]);

    $this->delete(route('roadmaps.destroy', $this->roadmap), ['confirmation' => 'outro'])->assertSessionHasErrors('confirmation');
    expect(Roadmap::query()->count())->toBe(1);

    $this->delete(route('roadmaps.destroy', $this->roadmap), ['confirmation' => 'laravel'])->assertRedirect(route('start'));

    expect(Roadmap::query()->count())->toBe(0)
        ->and(DB::table('topics')->count())->toBe(0)
        ->and(DB::table('study_sessions')->count())->toBe(0);
});

it('describes a roadmap for the management dialog', function () {
    $this->roadmap->topics()->where('key', 'ciclo')->firstOrFail()->update(['notes' => 'algo']);

    $this->get(route('start'))->assertInertia(fn (Assert $page) => $page
        ->where('roadmaps.0.management', [
            'id' => 'laravel',
            'name' => 'Laravel',
            'slug' => 'laravel',
            'key' => 'laravel',
            'originFile' => 'laravel.json',
            'importedAt' => today()->toDateString(),
            'completedTopics' => 0,
            'totalTopics' => 3,
            'sessionCount' => 0,
            'noteCount' => 1,
            'isArchived' => false,
        ]));
});
