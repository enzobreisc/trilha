import { SettingsDetailRow } from '@/components/settings/settings-detail-row';
import { SettingsSection } from '@/components/settings/settings-section';
import { useTranslation } from '@/hooks/use-translation';

export function RevisionsSection({
    index,
    firstReviewDays,
    secondReviewDays,
}: {
    index: number;
    firstReviewDays: number;
    secondReviewDays: number;
}) {
    const { t } = useTranslation();

    return (
        <SettingsSection title={t('revisões')} index={index}>
            <div className="flex flex-col gap-1.5">
                <SettingsDetailRow
                    label={t('intervalos')}
                    value={t(':first e :second dias após concluir', {
                        first: firstReviewDays,
                        second: secondReviewDays,
                    })}
                />
                <SettingsDetailRow
                    label={t('quando travar')}
                    value={t('volta para revisar e entra na fila de amanhã')}
                />
            </div>
            <p className="font-mono text-xs text-muted">
                {t('Os intervalos são fixos nesta versão.')}
            </p>
        </SettingsSection>
    );
}
