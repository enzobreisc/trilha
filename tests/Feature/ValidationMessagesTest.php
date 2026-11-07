<?php

use App\Enums\Locale;
use App\Services\AppSettings;
use Illuminate\Http\UploadedFile;

it('answers every failing form with a translated message', function (Locale $locale) {
    app(AppSettings::class)->useLocale($locale);
    $roadmap = importRoadmap();
    $topic = $roadmap->topics()->firstOrFail();

    $responses = [
        $this->post(route('import.preview'), ['file' => UploadedFile::fake()->create('roadmap.txt', 1)]),
        $this->post(route('sessions.store'), ['topicId' => 0, 'date' => 'amanhã', 'durationMinutes' => 0]),
        $this->patch(route('topics.update', [$roadmap, $topic]), ['status' => 'x', 'checkedItems' => [99], 'isExerciseCompleted' => 'talvez']),
        $this->put(route('roadmaps.update', $roadmap), ['title' => '']),
        $this->delete(route('roadmaps.destroy', $roadmap), ['confirmation' => 'x']),
        $this->post(route('backup.store'), ['backup' => UploadedFile::fake()->create('backup.txt', 1)]),
        $this->put(route('locale.update'), ['locale' => 'fr']),
    ];

    foreach ($responses as $response) {
        $response->assertSessionHasErrors();

        foreach (session('errors')->all() as $message) {
            expect($message)->not->toStartWith('validation.')->not->toContain('validation.');
        }
    }
})->with([Locale::PtBr, Locale::En]);

it('names the fields in Portuguese', function () {
    $this->post(route('import.preview'), ['file' => UploadedFile::fake()->create('roadmap.txt', 1)])
        ->assertSessionHasErrors('file');

    expect(session('errors')->first('file'))->toContain('arquivo')->not->toContain('file');
});
