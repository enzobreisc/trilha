import type { Locale } from '@/lib/i18n';

export type SettingsData = {
    selectedLocale: Locale;
    databasePath: string;
    databaseSizeMegabytes: number;
    lastBackupDate: string | null;
    firstReviewDays: number;
    secondReviewDays: number;
    appVersion: string;
    roadmapFormat: string;
};
