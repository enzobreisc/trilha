import { usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DataRow } from '@/components/ui/data-row';
import { useTranslation } from '@/hooks/use-translation';

const DATABASE_SIZE_FRACTION_DIGITS = 1;

export function DataSection({
    databasePath,
    databaseSizeMegabytes,
    lastBackupDate,
}: {
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
        <Card title={t('dados')}>
            <div className="flex flex-col">
                <DataRow label={t('banco de dados')} value={databasePath} />
                <DataRow
                    label={t('tamanho')}
                    value={`${sizeFormatter.format(databaseSizeMegabytes)} MB`}
                />
                <DataRow
                    label={t('último backup')}
                    value={
                        lastBackupDate ? shortDate(lastBackupDate) : t('nunca')
                    }
                />
            </div>
            <div className="flex flex-wrap gap-2.5">
                <Button>{t('Exportar backup')}</Button>
                <Button variant="secondary">{t('Restaurar backup…')}</Button>
            </div>
            <p className="text-xs text-faint">
                {t(
                    'O backup é um único arquivo .sqlite com roadmaps, progresso, sessões e anotações.',
                )}
            </p>
        </Card>
    );
}
