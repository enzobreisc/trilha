import { Button, ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DataRow } from '@/components/ui/data-row';
import { useTranslation } from '@/hooks/use-translation';
import { ReviewStatusIcon } from './review-status-icon';
import { useReviewDateLabel } from './use-review-date-label';

export function ReviewSummary({
    answeredCount,
    okCount,
    againCount,
    todayDate,
    onUndo,
}: {
    answeredCount: number;
    okCount: number;
    againCount: number;
    todayDate?: string;
    onUndo: () => void;
}) {
    const { t, plural } = useTranslation();
    const formatDate = useReviewDateLabel();

    return (
        <Card title={t('resumo')} aside={todayDate && formatDate(todayDate)}>
            <div className="flex flex-col gap-2">
                <span className="font-mono text-xs text-muted">
                    {t('fila de hoje concluída')}
                </span>
                <h3 className="text-[28px] leading-tight font-semibold tracking-tight">
                    {plural(answeredCount, 'revisão feita', 'revisões feitas')}
                </h3>
                <p className="text-secondary">
                    {againCount > 0
                        ? t(
                              'As revisões marcadas para rever entram na fila de amanhã. As demais voltam em 30 dias.',
                          )
                        : t('Todas as revisões voltam em 30 dias.')}
                </p>
            </div>
            <div className="flex max-w-sm flex-col">
                <DataRow
                    label={
                        <span className="flex items-center gap-2.5">
                            <ReviewStatusIcon outcome="ok" />
                            {t('Lembrei bem')}
                        </span>
                    }
                    value={okCount}
                />
                <DataRow
                    label={
                        <span className="flex items-center gap-2.5">
                            <ReviewStatusIcon outcome="again" />
                            {t('Preciso rever')}
                        </span>
                    }
                    value={againCount}
                />
            </div>
            <div className="flex flex-wrap gap-3">
                <ButtonLink href="/">{t('Ir para o painel')}</ButtonLink>
                <Button variant="secondary" onClick={onUndo}>
                    {t('Desfazer a última')}
                </Button>
            </div>
        </Card>
    );
}
