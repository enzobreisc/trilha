<?php

use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->roadmap = importRoadmap();
});

test('each screen route renders its page component', function (string $uri, string $component) {
    $this->get($uri)
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component($component));
})->with([
    'start' => ['/start', 'start'],
    'dashboard' => ['/dashboard', 'home'],
    'roadmap' => ['/roadmap', 'roadmap'],
    'reviews' => ['/reviews', 'reviews'],
    'sessions' => ['/sessions', 'sessions'],
    'import' => ['/import', 'import'],
    'settings' => ['/settings', 'settings'],
]);

test('the topic route renders the topic page', function () {
    $this->get('/roadmaps/laravel/topics/ciclo')
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('topics/show')->where('topic.key', 'ciclo'));
});

test('a topic from another roadmap is not found through this roadmap', function () {
    importRoadmap(roadmapDocument('outro', 'Outro'), 'outro.json');

    $this->get('/roadmaps/outro/topics/ciclo')->assertOk();
    $this->get('/roadmaps/laravel/topics/inexistente')->assertNotFound();
});
