import type { SettingsData } from '@/components/settings/types';

export const sampleSettings: SettingsData = {
    selectedLocale: 'pt_BR',
    databasePath: '~/Library/Application Support/trilha/database.sqlite',
    databaseSizeMegabytes: 4.2,
    lastBackupDate: null,
    firstReviewDays: 7,
    secondReviewDays: 30,
    appVersion: '0.1.0',
    roadmapFormat: 'trilha/v1',
};
