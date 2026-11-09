<?php

use App\Enums\TopicStatus;
use App\Models\Review;
use App\Models\Topic;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function () {
    $this->travelTo('2026-11-07 21:40:00');
    $this->roadmap = importRoadmap();
    $this->topic = $this->roadmap->topics()->where('key', 'n-mais-1')->firstOrFail();
    $this->topicUrl = route('topics.update', [$this->roadmap, $this->topic]);
});

function logSession(object $test, Topic $topic, array $overrides = []): void
{
    $test->post(route('sessions.store'), [
        'topicId' => $topic->id,
        'date' => '2026-11-07',
        'durationMinutes' => 50,
        'activities' => ['docs'],
        'note' => 'Entendi with e load.',
        ...$overrides,
    ])->assertRedirect();
}

it('logs a study session and marks a todo topic as studying', function () {
    logSession($this, $this->topic, ['date' => '2026-11-06']);

    $this->topic->refresh();
    expect($this->topic->status)->toBe(TopicStatus::Studying)
        ->and($this->topic->started_on->toDateString())->toBe('2026-11-06')
        ->and($this->topic->studySessions()->count())->toBe(1)
        ->and($this->topic->studySessions()->first()->started_at)->toBe('21:40');
});

it('rejects a session with no duration or in the future', function () {
    $this->post(route('sessions.store'), ['topicId' => $this->topic->id, 'date' => '2026-11-08', 'durationMinutes' => 0])
        ->assertSessionHasErrors(['date', 'durationMinutes']);
});

it('lists the sessions and the weekly stats', function () {
    logSession($this, $this->topic);

    $this->get(route('sessions'))->assertInertia(fn (Assert $page) => $page
        ->where('sessions.0.topicTitle', 'N+1')
        ->where('sessions.0.roadmapId', 'laravel')
        ->where('stats.weekMinutes', 50)
        ->where('stats.streakDays', 1)
        ->where('contributionDays.181', ['date' => '2026-11-07', 'level' => 2]));
});

it('edits and deletes a session', function () {
    logSession($this, $this->topic);
    $session = $this->topic->studySessions()->firstOrFail();

    $this->put(route('sessions.update', $session), [
        'topicId' => $this->topic->id, 'date' => '2026-11-07', 'durationMinutes' => 90, 'activities' => [], 'note' => 'Novo',
    ])->assertRedirect();
    expect($session->refresh()->duration_minutes)->toBe(90);

    $this->delete(route('sessions.destroy', $session))->assertRedirect();
    expect($this->topic->studySessions()->count())->toBe(0);
});

it('schedules the 7 and 30 day reviews only when a topic is completed', function () {
    $this->patch($this->topicUrl, ['status' => 'studying'])->assertRedirect();
    expect(Review::query()->count())->toBe(0);

    $this->patch($this->topicUrl, ['status' => 'done'])->assertRedirect();

    expect($this->topic->reviews()->orderBy('interval_days')->get()->map(fn (Review $review) => [$review->interval_days, $review->due_on->toDateString()])->all())
        ->toBe([[7, '2026-11-14'], [30, '2026-12-07']])
        ->and($this->topic->refresh()->completed_on->toDateString())->toBe('2026-11-07');
});

it('drops pending reviews when a completed topic is reopened', function () {
    $this->patch($this->topicUrl, ['status' => 'done']);
    $this->patch($this->topicUrl, ['status' => 'studying']);

    expect(Review::query()->count())->toBe(0)
        ->and($this->topic->refresh()->completed_on)->toBeNull();
});

it('saves the checklist, the notes and the exercise', function () {
    $this->patch($this->topicUrl, ['checkedItems' => [1], 'notes' => 'anotação', 'isExerciseCompleted' => true])->assertRedirect();

    $this->topic->refresh();
    expect($this->topic->checked_items)->toBe([1])
        ->and($this->topic->notes)->toBe('anotação')
        ->and($this->topic->exercise_completed_on->toDateString())->toBe('2026-11-07');

    $this->patch($this->topicUrl, ['checkedItems' => [5]])->assertSessionHasErrors('checkedItems.0');
});

it('shows the topic detail with its reviews and sessions', function () {
    logSession($this, $this->topic);
    $this->patch($this->topicUrl, ['status' => 'done']);

    $this->get(route('topics.show', [$this->roadmap, $this->topic]))->assertInertia(fn (Assert $page) => $page
        ->where('topic.status', 'done')
        ->where('topic.path', ['Laravel', '02 banco', 'performance'])
        ->has('topic.sessions', 1)
        ->has('topic.reviews', 2)
        ->where('topic.reviews.0.dueOn', '2026-11-14'));
});

describe('reviews', function () {
    beforeEach(function () {
        $this->patch($this->topicUrl, ['status' => 'done']);
        $this->travelTo('2026-11-14 09:00:00');
    });

    it('queues a review on the day it is due, with the topic displayed as to review', function () {
        $this->get(route('reviews'))->assertInertia(fn (Assert $page) => $page
            ->has('items', 1)
            ->where('items.0.title', 'N+1')
            ->where('items.0.interval', '7d')
            ->where('items.0.path', '02 banco / performance')
            ->where('days.0', ['date' => '2026-11-14', 'count' => 1, 'isToday' => true])
            ->where('upcoming.0.interval', '30d'));

        $this->get(route('roadmap'))->assertInertia(fn (Assert $page) => $page
            ->where('sections.1.groups.0.topics.0.status', 'review'));
        $this->get(route('start'))->assertInertia(fn (Assert $page) => $page->where('roadmaps.0.reviewsDue', 1));
    });

    it('counts the due reviews of the current roadmap on the dashboard', function () {
        $this->get(route('dashboard'))->assertInertia(fn (Assert $page) => $page
            ->where('reviewsDueCount', 1)
            ->has('reviews', 1));
    });

    it('keeps the topic done when a review is remembered well', function () {
        $review = $this->topic->reviews()->where('interval_days', 7)->firstOrFail();

        $this->post(route('reviews.answer', $review), ['outcome' => 'ok'])->assertRedirect();

        expect($review->refresh()->answered_on->toDateString())->toBe('2026-11-14')
            ->and($this->topic->refresh()->status)->toBe(TopicStatus::Done)
            ->and($this->topic->dueReviews()->count())->toBe(0);
    });

    it('sends the topic back to review and queues it again tomorrow when the user needs to review', function () {
        $review = $this->topic->reviews()->where('interval_days', 7)->firstOrFail();

        $this->post(route('reviews.answer', $review), ['outcome' => 'again'])->assertRedirect();

        $retry = $this->topic->reviews()->pending()->where('interval_days', 1)->firstOrFail();
        expect($this->topic->refresh()->status)->toBe(TopicStatus::Review)
            ->and($retry->due_on->toDateString())->toBe('2026-11-15');
    });

    it('undoes the last answer', function () {
        $review = $this->topic->reviews()->where('interval_days', 7)->firstOrFail();
        $this->post(route('reviews.answer', $review), ['outcome' => 'again']);

        $this->delete(route('reviews.undo', $review))->assertRedirect();

        expect($review->refresh()->outcome)->toBeNull()
            ->and($this->topic->reviews()->pending()->where('interval_days', 1)->exists())->toBeFalse()
            ->and($this->topic->refresh()->status)->toBe(TopicStatus::Done);
    });

    it('ignores reviews of archived roadmaps', function () {
        $this->roadmap->update(['archived_at' => now()]);
        importRoadmap(roadmapDocument('outro', 'Outro'), 'outro.json');

        $this->get(route('reviews'))->assertInertia(fn (Assert $page) => $page->has('items', 0));
    });
});

it('builds the dashboard for the current roadmap', function () {
    logSession($this, $this->topic);

    $this->get(route('dashboard'))->assertInertia(fn (Assert $page) => $page
        ->where('roadmapName', 'Laravel')
        ->where('progress', ['done' => 0, 'total' => 3])
        ->where('currentTopic.title', 'N+1')
        ->where('currentTopic.breadcrumb', '02 banco / performance')
        ->where('currentTopic.minutesSpent', 50)
        ->where('nextTopic.title', 'Ciclo')
        ->where('stats.weekSessionCount', 1));
});

it('shows the next topic once nothing is in progress', function () {
    $this->get(route('dashboard'))->assertInertia(fn (Assert $page) => $page
        ->where('currentTopic', null)
        ->where('completedTopicTitle', null)
        ->where('nextTopic.title', 'Ciclo'));
});
