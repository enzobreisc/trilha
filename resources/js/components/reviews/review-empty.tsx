import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import { CalendarIcon } from './review-icons';
import type { UpcomingReview } from './types';
import { useReviewDateLabel } from './use-review-date-label';

export function ReviewEmpty({ nextReview }: { nextReview?: UpcomingReview }) {
    const { t } = useTranslation();
    const formatDate = useReviewDateLabel();

    return (
        <Card className="items-center py-12 text-center">
            <span className="flex size-14 items-center justify-center rounded-full bg-active text-accent">
                <CalendarIcon width={26} height={26} />
            </span>
            <div className="flex flex-col gap-2">
                <h2 className="font-display text-3xl leading-tight font-bold tracking-tight">
                    {t('Tudo em dia')}
                </h2>
                <p className="text-secondary">
                    {t('nenhuma revisão vence hoje')}
                </p>
                {nextReview && (
                    <p className="text-sm font-medium text-muted">
                        {t('A próxima é :title, :day, em :roadmap.', {
                            title: nextReview.title,
                            day: formatDate(nextReview.date),
                            roadmap: nextReview.roadmapId,
                        })}
                    </p>
                )}
            </div>
            <div className="flex flex-wrap justify-center gap-3">
                <ButtonLink href="/">{t('Ir para o painel')}</ButtonLink>
                <ButtonLink href="/roadmap" variant="secondary">
                    {t('Ver a trilha')}
                </ButtonLink>
            </div>
        </Card>
    );
}
