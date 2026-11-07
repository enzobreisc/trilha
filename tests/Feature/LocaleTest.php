<?php

use App\Enums\Locale;
use App\Models\Setting;
use App\Services\AppSettings;
use Inertia\Testing\AssertableInertia as Assert;

it('defaults to Brazilian Portuguese', function () {
    $this->get('/start')->assertInertia(fn (Assert $page) => $page
        ->where('locale', 'pt_BR')
        ->where('language_tag', 'pt-BR'));
});

it('persists the chosen language in the settings and applies it to later requests', function () {
    $this->put(route('locale.update'), ['locale' => 'en'])->assertRedirect();

    expect(app(AppSettings::class)->locale())->toBe(Locale::En);

    $this->get('/start')->assertInertia(fn (Assert $page) => $page
        ->where('locale', 'en')
        ->where('language_tag', 'en-US'));
});

it('rejects an unsupported language', function () {
    $this->put(route('locale.update'), ['locale' => 'fr'])
        ->assertSessionHasErrors('locale');

    expect(session('errors')->first('locale'))->not->toStartWith('validation.')
        ->and(app(AppSettings::class)->locale())->toBe(Locale::PtBr);
});

it('ignores a stored language that is no longer supported', function () {
    Setting::query()->create(['key' => 'locale', 'value' => 'fr']);

    $this->get('/start')->assertInertia(fn (Assert $page) => $page->where('locale', 'pt_BR'));
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
