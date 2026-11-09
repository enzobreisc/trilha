<?php

use App\Models\Roadmap;
use Inertia\Testing\AssertableInertia as Assert;

it('redirects the root to the dashboard', function () {
    $this->get('/')->assertRedirect(route('dashboard'));
});

it('lands on the start screen from the root while no roadmap exists', function () {
    $this->followingRedirects()->get('/')
        ->assertInertia(fn (Assert $page) => $page->component('start'));
});

it('shows the empty state on the start screen while no roadmap exists', function () {
    $this->get(route('start'))
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('start')->where('roadmaps', []));
});

it('keeps the import and settings screens reachable without a roadmap', function (string $routeName) {
    $this->get(route($routeName))->assertOk();
})->with(['import', 'settings']);

it('sends every roadmap-dependent screen back to the start screen without a roadmap', function (string $uri) {
    $this->get($uri)->assertRedirect(route('start'));
})->with(['/dashboard', '/roadmap', '/reviews', '/sessions']);

it('ignores archived roadmaps when deciding whether one exists', function () {
    Roadmap::query()->create([
        'key' => 'old',
        'title' => 'Old',
        'source_file' => 'old.json',
        'imported_at' => now(),
        'archived_at' => now(),
    ]);

    $this->get('/roadmap')->assertRedirect(route('start'));
});
