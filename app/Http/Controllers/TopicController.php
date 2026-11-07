<?php

namespace App\Http\Controllers;

use App\Actions\UpdateTopicProgress;
use App\Http\Requests\UpdateTopicRequest;
use App\Models\Roadmap;
use App\Models\Topic;
use App\Queries\TopicDetail;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class TopicController extends Controller
{
    public function show(Roadmap $roadmap, Topic $topic, TopicDetail $detail): Response
    {
        return Inertia::render('topics/show', [
            'topic' => $detail->for($roadmap, $topic),
        ]);
    }

    public function update(UpdateTopicRequest $request, Roadmap $roadmap, Topic $topic, UpdateTopicProgress $updateProgress): RedirectResponse
    {
        $updateProgress->handle($topic, $request->validated());

        return back();
    }
}
