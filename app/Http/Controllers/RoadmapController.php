<?php

namespace App\Http\Controllers;

use App\Http\Requests\DestroyRoadmapRequest;
use App\Http\Requests\UpdateRoadmapRequest;
use App\Models\Roadmap;
use App\Services\AppSettings;
use Illuminate\Http\RedirectResponse;

class RoadmapController extends Controller
{
    public function select(Roadmap $roadmap, AppSettings $settings): RedirectResponse
    {
        $settings->selectRoadmap($roadmap);

        return to_route('dashboard');
    }

    public function update(UpdateRoadmapRequest $request, Roadmap $roadmap): RedirectResponse
    {
        $roadmap->update(['title' => $request->string('title')->trim()->toString()]);

        return back();
    }

    public function destroy(DestroyRoadmapRequest $request, Roadmap $roadmap): RedirectResponse
    {
        $roadmap->delete();

        return to_route('start');
    }
}
