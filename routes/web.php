<?php

use App\Http\Controllers\BackupController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ImportController;
use App\Http\Controllers\ImportTemplateController;
use App\Http\Controllers\LocaleController;
use App\Http\Controllers\ReviewAnswerController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\RoadmapArchiveController;
use App\Http\Controllers\RoadmapController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\StartController;
use App\Http\Controllers\StudySessionController;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\TrailController;
use Illuminate\Support\Facades\Route;

Route::put('/locale', [LocaleController::class, 'update'])->name('locale.update');
Route::get('/', fn () => to_route('dashboard'))->name('home');
Route::get('/start', [StartController::class, 'index'])->name('start');

Route::get('/import', [ImportController::class, 'create'])->name('import');
Route::post('/import/preview', [ImportController::class, 'preview'])->name('import.preview');
Route::delete('/import/preview', [ImportController::class, 'cancel'])->name('import.cancel');
Route::post('/import', [ImportController::class, 'store'])->name('import.store');
Route::get('/import/template', ImportTemplateController::class)->name('import.template');

Route::get('/settings', [SettingsController::class, 'show'])->name('settings');
Route::get('/settings/backup', [BackupController::class, 'show'])->name('backup.show');
Route::post('/settings/backup', [BackupController::class, 'store'])->name('backup.store');

Route::put('/roadmaps/{roadmap}', [RoadmapController::class, 'update'])->name('roadmaps.update');
Route::delete('/roadmaps/{roadmap}', [RoadmapController::class, 'destroy'])->name('roadmaps.destroy');
Route::put('/roadmaps/{roadmap}/select', [RoadmapController::class, 'select'])->name('roadmaps.select');
Route::put('/roadmaps/{roadmap}/archive', [RoadmapArchiveController::class, 'store'])->name('roadmaps.archive');
Route::delete('/roadmaps/{roadmap}/archive', [RoadmapArchiveController::class, 'destroy'])->name('roadmaps.unarchive');

Route::middleware('has.roadmap')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'show'])->name('dashboard');
    Route::get('/roadmap', [TrailController::class, 'show'])->name('roadmap');

    Route::scopeBindings()->group(function () {
        Route::get('/roadmaps/{roadmap}/topics/{topic}', [TopicController::class, 'show'])->name('topics.show');
        Route::patch('/roadmaps/{roadmap}/topics/{topic}', [TopicController::class, 'update'])->name('topics.update');
    });

    Route::get('/reviews', [ReviewController::class, 'index'])->name('reviews');
    Route::post('/reviews/{review}/answer', [ReviewAnswerController::class, 'store'])->name('reviews.answer');
    Route::delete('/reviews/{review}/answer', [ReviewAnswerController::class, 'destroy'])->name('reviews.undo');

    Route::get('/sessions', [StudySessionController::class, 'index'])->name('sessions');
    Route::post('/sessions', [StudySessionController::class, 'store'])->name('sessions.store');
    Route::put('/sessions/{session}', [StudySessionController::class, 'update'])->name('sessions.update');
    Route::delete('/sessions/{session}', [StudySessionController::class, 'destroy'])->name('sessions.destroy');
});
