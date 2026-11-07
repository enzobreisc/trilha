<?php

namespace App\Services;

use App\Enums\Locale;
use App\Models\Roadmap;
use App\Models\Setting;

class AppSettings
{
    private const LOCALE_KEY = 'locale';

    private const CURRENT_ROADMAP_KEY = 'current_roadmap_id';

    private const LAST_BACKUP_KEY = 'last_backup_on';

    public function locale(): Locale
    {
        $stored = Setting::query()->find(self::LOCALE_KEY)?->value;

        return ($stored === null ? null : Locale::tryFrom($stored))
            ?? Locale::from((string) config('app.locale'));
    }

    public function useLocale(Locale $locale): void
    {
        Setting::query()->updateOrCreate(['key' => self::LOCALE_KEY], ['value' => $locale->value]);
    }

    public function currentRoadmap(): ?Roadmap
    {
        $storedId = Setting::query()->find(self::CURRENT_ROADMAP_KEY)?->value;

        return Roadmap::query()->active()->find($storedId)
            ?? Roadmap::query()->active()->orderBy('id')->first();
    }

    public function selectRoadmap(Roadmap $roadmap): void
    {
        Setting::query()->updateOrCreate(
            ['key' => self::CURRENT_ROADMAP_KEY],
            ['value' => (string) $roadmap->id],
        );
    }

    public function lastBackupDate(): ?string
    {
        return Setting::query()->find(self::LAST_BACKUP_KEY)?->value;
    }

    public function recordBackup(): void
    {
        Setting::query()->updateOrCreate(
            ['key' => self::LAST_BACKUP_KEY],
            ['value' => today()->toDateString()],
        );
    }
}
