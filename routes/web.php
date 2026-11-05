<?php

use App\Http\Controllers\LocaleController;
use Illuminate\Support\Facades\Route;

Route::put('/locale', [LocaleController::class, 'update'])->name('locale.update');
Route::inertia('/', 'home')->name('home');
Route::inertia('/roadmap', 'roadmap')->name('roadmap');
Route::get('/topics/{topic}', fn (string $topic) => inertia('topics/show', ['topicKey' => $topic]))->name('topics.show');
Route::inertia('/reviews', 'reviews')->name('reviews');
Route::inertia('/import', 'import')->name('import');
Route::inertia('/start', 'start')->name('start');
Route::inertia('/welcome', 'welcome')->name('welcome');
Route::inertia('/settings', 'settings')->name('settings');
Route::inertia('/sessions', 'sessions')->name('sessions');
