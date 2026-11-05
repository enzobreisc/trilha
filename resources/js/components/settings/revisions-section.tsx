import { Card } from '@/components/ui/card';
import { DataRow } from '@/components/ui/data-row';
import { useTranslation } from '@/hooks/use-translation';

export function RevisionsSection({
    firstReviewDays,
    secondReviewDays,
}: {
    firstReviewDays: number;
    secondReviewDays: number;
}) {
    const { t } = useTranslation();

    return (
        <Card title={t('revisões')}>
            <div className="flex flex-col">
                <DataRow
                    label={t('intervalos')}
                    value={t(':first e :second dias após concluir', {
                        first: firstReviewDays,
                        second: secondReviewDays,
                    })}
                />
                <DataRow
                    label={t('quando travar')}
                    value={t('volta para revisar e entra na fila de amanhã')}
                />
            </div>
            <p className="text-xs text-faint">
                {t('Os intervalos são fixos nesta versão.')}
            </p>
        </Card>
    );
}
