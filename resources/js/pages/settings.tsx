import { AboutSection } from '@/components/settings/about-section';
import { DataSection } from '@/components/settings/data-section';
import { LanguageSection } from '@/components/settings/language-section';
import { RevisionsSection } from '@/components/settings/revisions-section';
import type { SettingsData } from '@/components/settings/types';
import { PageHeader } from '@/components/ui/page-header';
import { useTranslation } from '@/hooks/use-translation';
import { sampleSettings } from '@/lib/sample/settings';

export default function Settings(props: Partial<SettingsData>) {
    const { t } = useTranslation();
    const data = { ...sampleSettings, ...props };

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-7">
            <PageHeader
                title={t('Ajustes')}
                description={t(
                    'Tudo fica neste computador. Não há conta nem sincronização.',
                )}
            />
            <div className="flex flex-col gap-4">
                <LanguageSection initialLocale={data.selectedLocale} />
                <DataSection
                    databasePath={data.databasePath}
                    databaseSizeMegabytes={data.databaseSizeMegabytes}
                    lastBackupDate={data.lastBackupDate}
                />
                <RevisionsSection
                    firstReviewDays={data.firstReviewDays}
                    secondReviewDays={data.secondReviewDays}
                />
                <AboutSection
                    appVersion={data.appVersion}
                    roadmapFormat={data.roadmapFormat}
                />
            </div>
        </div>
    );
}
