<?php

namespace App\Http\Middleware;

use App\Enums\Locale;
use App\Queries\ChromeData;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'locale' => app()->getLocale(),
            'language_tag' => Locale::from(app()->getLocale())->languageTag(),
            'native' => (bool) config('nativephp-internal.running'),
            'today' => today()->toDateString(),
            'chrome' => fn () => app(ChromeData::class)->build(),
        ];
    }
}
