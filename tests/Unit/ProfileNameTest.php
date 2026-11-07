<?php

use App\Services\ProfileName;

it('uses the first word of the full name', function () {
    expect(ProfileName::fromPasswdEntry(['name' => 'enzobreisc', 'gecos' => 'Enzo Müller,,,']))->toBe('Enzo');
});

it('falls back to the login name capitalized', function (array $entry) {
    expect(ProfileName::fromPasswdEntry($entry))->toBe('Enzobreisc');
})->with([
    'empty full name' => [['name' => 'enzobreisc', 'gecos' => '']],
    'no full name' => [['name' => 'enzobreisc']],
]);

it('falls back to the app name without a passwd entry', function () {
    expect(ProfileName::fromPasswdEntry(null))->toBe('trilha');
});
