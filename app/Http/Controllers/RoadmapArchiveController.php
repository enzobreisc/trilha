<?php

namespace App\Http\Controllers;

use App\Models\Roadmap;
use Illuminate\Http\RedirectResponse;

class RoadmapArchiveController extends Controller
{
    public function store(Roadmap $roadmap): RedirectResponse
    {
        $roadmap->update(['archived_at' => now()]);

        return to_route('start');
    }

    public function destroy(Roadmap $roadmap): RedirectResponse
    {
        $roadmap->update(['archived_at' => null]);

        return to_route('start');
    }
}
