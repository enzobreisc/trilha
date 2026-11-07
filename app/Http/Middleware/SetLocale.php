<?php

namespace App\Http\Middleware;

use App\Services\AppSettings;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SetLocale
{
    public function __construct(private readonly AppSettings $settings) {}

    public function handle(Request $request, Closure $next): Response
    {
        app()->setLocale($this->settings->locale()->value);

        return $next($request);
    }
}
