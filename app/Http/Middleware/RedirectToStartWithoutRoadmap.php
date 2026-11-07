<?php

namespace App\Http\Middleware;

use App\Services\AppSettings;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectToStartWithoutRoadmap
{
    public function __construct(private readonly AppSettings $settings) {}

    public function handle(Request $request, Closure $next): Response
    {
        if ($this->settings->currentRoadmap() === null) {
            return redirect()->route('start');
        }

        return $next($request);
    }
}
