import { router, usePage } from '@inertiajs/react';
import { useRef } from 'react';
import { SettingsDetailRow } from '@/components/settings/settings-detail-row';
import { SettingsSection } from '@/components/settings/settings-section';
import { Button, DownloadLink } from '@/components/ui/button';
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
    const { language_tag: languageTag, errors } = usePage().props;
    const restoreInputRef = useRef<HTMLInputElement>(null);
    const sizeFormatter = new Intl.NumberFormat(languageTag, {
        maximumFractionDigits: DATABASE_SIZE_FRACTION_DIGITS,
    });

    function restoreBackup(file: File | undefined) {
        const input = restoreInputRef.current;
        if (input) {
            input.value = '';
        }
        if (
            !file ||
            !window.confirm(
                t(
                    'Restaurar vai substituir todos os dados deste computador pelos do backup. Continuar?',
                ),
            )
        ) {
            return;
        }
        router.post(
            '/settings/backup',
            { backup: file },
            { forceFormData: true },
        );
    }

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
                <DownloadLink href="/settings/backup">
                    {t('Exportar backup')}
                </DownloadLink>
                <input
                    ref={restoreInputRef}
                    type="file"
                    accept=".sqlite,.db"
                    className="hidden"
                    onChange={(event) =>
                        restoreBackup(event.currentTarget.files?.[0])
                    }
                />
                <Button
                    variant="secondary"
                    onClick={() => restoreInputRef.current?.click()}
                >
                    {t('Restaurar backup…')}
                </Button>
            </div>
            {errors.backup && (
                <p role="alert" className="font-mono text-xs text-danger">
                    {errors.backup}
                </p>
            )}
            <p className="font-mono text-xs text-muted">
                {t(
                    'O backup é um único arquivo .sqlite com roadmaps, progresso, sessões e anotações.',
                )}
            </p>
        </SettingsSection>
    );
}
