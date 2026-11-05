<?php

namespace App\Http\Controllers;

use App\Enums\Locale;
use App\Http\Requests\UpdateLocaleRequest;
use Illuminate\Http\RedirectResponse;

class LocaleController extends Controller
{
    public function update(UpdateLocaleRequest $request): RedirectResponse
    {
        $locale = Locale::from($request->string('locale')->toString());

        return back()->withCookie(cookie()->forever(Locale::COOKIE, $locale->value));
    }
}
