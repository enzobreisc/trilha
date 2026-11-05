import { usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { SettingsDetailRow } from '@/components/settings/settings-detail-row';
import { SettingsSection } from '@/components/settings/settings-section';
import { useTranslation } from '@/hooks/use-translation';

const DATABASE_SIZE_FRACTION_DIGITS = 1;

export function DataSection({
    index,
    databasePath,
    databaseSizeMegabytes,
    lastBackupDate,
}: {
    index: number;
    databasePath: string;
    databaseSizeMegabytes: number;
    lastBackupDate: string | null;
}) {
    const { t, shortDate } = useTranslation();
    const { language_tag: languageTag } = usePage().props;
    const sizeFormatter = new Intl.NumberFormat(languageTag, {
        maximumFractionDigits: DATABASE_SIZE_FRACTION_DIGITS,
    });

    return (
        <SettingsSection title={t('dados')} index={index}>
            <div className="flex flex-col gap-1.5">
                <SettingsDetailRow
                    label={t('banco de dados')}
                    value={databasePath}
                />
                <SettingsDetailRow
                    label={t('tamanho')}
                    value={`${sizeFormatter.format(databaseSizeMegabytes)} MB`}
                />
                <SettingsDetailRow
                    label={t('último backup')}
                    value={
                        lastBackupDate ? shortDate(lastBackupDate) : t('nunca')
                    }
                />
            </div>
            <div className="flex flex-wrap gap-2">
                <Button variant="secondary">{t('Exportar backup')}</Button>
                <Button variant="secondary">{t('Restaurar backup…')}</Button>
            </div>
            <p className="font-mono text-xs text-muted">
                {t(
                    'O backup é um único arquivo .sqlite com roadmaps, progresso, sessões e anotações.',
                )}
            </p>
        </SettingsSection>
    );
}
