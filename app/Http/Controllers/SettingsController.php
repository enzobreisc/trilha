<?php

namespace App\Http\Controllers;

use App\Services\AppSettings;
use App\Services\DatabaseBackup;
use Inertia\Inertia;
use Inertia\Response;

class SettingsController extends Controller
{
    public function show(AppSettings $settings, DatabaseBackup $backup): Response
    {
        [$firstReviewDays, $secondReviewDays] = config('trilha.review_intervals_in_days');

        return Inertia::render('settings', [
            'selectedLocale' => $settings->locale()->value,
            'databasePath' => $backup->path(),
            'databaseSizeMegabytes' => $backup->sizeInMegabytes(),
            'lastBackupDate' => $settings->lastBackupDate(),
            'firstReviewDays' => $firstReviewDays,
            'secondReviewDays' => $secondReviewDays,
            'appVersion' => (string) config('nativephp.version'),
            'roadmapFormat' => (string) config('trilha.roadmap_format'),
        ]);
    }
}
