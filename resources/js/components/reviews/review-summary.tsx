import { Button, ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { DataRow } from '@/components/ui/data-row';
import { useTranslation } from '@/hooks/use-translation';
import { CheckCircleIcon } from './review-icons';
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
        <Card
            title={t('resumo')}
            aside={todayDate && formatDate(todayDate)}
            className="items-center py-12 text-center"
        >
            <span className="flex size-14 items-center justify-center rounded-full bg-accent text-bg">
                <CheckCircleIcon width={26} height={26} />
            </span>
            <div className="flex flex-col gap-2">
                <span className="text-xs font-extrabold tracking-widest text-muted uppercase">
                    {t('fila de hoje concluída')}
                </span>
                <h3 className="font-display text-3xl leading-tight font-bold tracking-tight">
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
            <div className="flex w-full max-w-sm flex-col">
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
            <div className="flex flex-wrap justify-center gap-3">
                <ButtonLink href="/">{t('Ir para o painel')}</ButtonLink>
                <Button variant="secondary" onClick={onUndo}>
                    {t('Desfazer a última')}
                </Button>
            </div>
        </Card>
    );
}
