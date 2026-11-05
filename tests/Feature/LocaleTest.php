<?php

use App\Enums\Locale;
use Inertia\Testing\AssertableInertia as Assert;

it('defaults to Brazilian Portuguese', function () {
    $this->get('/')->assertInertia(fn (Assert $page) => $page
        ->where('locale', 'pt_BR')
        ->where('language_tag', 'pt-BR'));
});

it('persists the chosen language in a cookie and applies it to later requests', function () {
    $response = $this->put(route('locale.update'), ['locale' => 'en'])
        ->assertRedirect()
        ->assertCookie(Locale::COOKIE, 'en');

    $this->withUnencryptedCookie(Locale::COOKIE, $response->getCookie(Locale::COOKIE, false)->getValue())
        ->get('/')
        ->assertInertia(fn (Assert $page) => $page
            ->where('locale', 'en')
            ->where('language_tag', 'en-US'));
});

it('rejects an unsupported language', function () {
    $this->put(route('locale.update'), ['locale' => 'fr'])
        ->assertSessionHasErrors('locale')
        ->assertCookieMissing(Locale::COOKIE);

    expect(session('errors')->first('locale'))->not->toStartWith('validation.');
});

it('ignores a stored language that is no longer supported', function () {
    $this->withCookie(Locale::COOKIE, 'fr')
        ->get('/')
        ->assertInertia(fn (Assert $page) => $page->where('locale', 'pt_BR'));
});

it('has an English translation for every literal key used on the server', function () {
    $translations = json_decode((string) file_get_contents(lang_path('en.json')), true);
    $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator(app_path()));
    $missing = [];

    foreach ($files as $file) {
        if ($file->getExtension() !== 'php') {
            continue;
        }

        preg_match_all('/\b(?:__|trans)\(\s*(\'(?:[^\'\\\\]|\\\\.)*\'|"(?:[^"\\\\]|\\\\.)*")/', (string) file_get_contents($file->getPathname()), $matches);

        foreach ($matches[1] as $literal) {
            $key = stripcslashes(substr($literal, 1, -1));

            if (! array_key_exists($key, $translations)) {
                $missing[] = $key;
            }
        }
    }

    expect($missing)->toBe([]);
});
