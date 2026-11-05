import { Head } from '@inertiajs/react';
import { AboutSection } from '@/components/settings/about-section';
import { DataSection } from '@/components/settings/data-section';
import { LanguageSection } from '@/components/settings/language-section';
import { RevisionsSection } from '@/components/settings/revisions-section';
import type { SettingsData } from '@/components/settings/types';
import { useTranslation } from '@/hooks/use-translation';
import { sampleSettings } from '@/lib/sample/settings';

export default function Settings(props: Partial<SettingsData>) {
    const { t } = useTranslation();
    const data = { ...sampleSettings, ...props };

    return (
        <div className="mx-auto flex w-full max-w-215 flex-col gap-7">
            <Head title={t('Ajustes')} />
            <header className="flex flex-col gap-2">
                <h1 className="text-[26px] leading-8.5 font-semibold tracking-[-0.02em]">
                    {t('Ajustes')}
                </h1>
                <p className="text-secondary">
                    {t(
                        'Tudo fica neste computador. Não há conta nem sincronização.',
                    )}
                </p>
            </header>
            <div className="flex flex-col gap-6">
                <LanguageSection
                    index={1}
                    initialLocale={data.selectedLocale}
                />
                <DataSection
                    index={2}
                    databasePath={data.databasePath}
                    databaseSizeMegabytes={data.databaseSizeMegabytes}
                    lastBackupDate={data.lastBackupDate}
                />
                <RevisionsSection
                    index={3}
                    firstReviewDays={data.firstReviewDays}
                    secondReviewDays={data.secondReviewDays}
                />
                <AboutSection
                    index={4}
                    appVersion={data.appVersion}
                    roadmapFormat={data.roadmapFormat}
                />
            </div>
        </div>
    );
}
