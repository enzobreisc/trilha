<?php

namespace App\Http\Controllers;

use App\Enums\Locale;
use App\Http\Requests\UpdateLocaleRequest;
use App\Services\AppSettings;
use Illuminate\Http\RedirectResponse;

class LocaleController extends Controller
{
    public function update(UpdateLocaleRequest $request, AppSettings $settings): RedirectResponse
    {
        $settings->useLocale(Locale::from($request->string('locale')->toString()));

        return back();
    }
}
