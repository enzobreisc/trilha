import { SettingsDetailRow } from '@/components/settings/settings-detail-row';
import { SettingsSection } from '@/components/settings/settings-section';
import { useTranslation } from '@/hooks/use-translation';

export function AboutSection({
    index,
    appVersion,
    roadmapFormat,
}: {
    index: number;
    appVersion: string;
    roadmapFormat: string;
}) {
    const { t } = useTranslation();

    return (
        <SettingsSection title={t('sobre')} index={index}>
            <div className="flex flex-col gap-1.5">
                <SettingsDetailRow label={t('versão')} value={appVersion} />
                <SettingsDetailRow
                    label={t('formato de roadmap')}
                    value={roadmapFormat}
                />
            </div>
        </SettingsSection>
    );
}
