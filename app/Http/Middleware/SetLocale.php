<?php

namespace App\Http\Middleware;

use App\Enums\Locale;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    public function handle(Request $request, Closure $next): Response
    {
        app()->setLocale(self::fromRequest($request)->value);

        return $next($request);
    }

    private static function fromRequest(Request $request): Locale
    {
        $stored = $request->cookie(Locale::COOKIE);

        return (is_string($stored) ? Locale::tryFrom($stored) : null)
            ?? Locale::from((string) config('app.locale'));
    }
}
