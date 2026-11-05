<?php

use Inertia\Testing\AssertableInertia as Assert;

test('each screen route renders its page component', function (string $uri, string $component) {
    $this->get($uri)
        ->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component($component));
})->with([
    'home' => ['/', 'home'],
    'roadmap' => ['/roadmap', 'roadmap'],
    'topic' => ['/topics/problema-n-mais-1', 'topics/show'],
    'reviews' => ['/reviews', 'reviews'],
    'import' => ['/import', 'import'],
    'welcome' => ['/welcome', 'welcome'],
]);
