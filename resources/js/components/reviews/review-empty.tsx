import { ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import type { UpcomingReview } from './types';
import { useReviewDateLabel } from './use-review-date-label';

export function ReviewEmpty({ nextReview }: { nextReview?: UpcomingReview }) {
    const { t } = useTranslation();
    const formatDate = useReviewDateLabel();

    return (
        <Card>
            <div className="flex flex-col gap-2">
                <h2 className="text-[26px] leading-tight font-semibold tracking-tight">
                    {t('Tudo em dia')}
                </h2>
                <p className="text-secondary">
                    {t('nenhuma revisão vence hoje')}
                </p>
                {nextReview && (
                    <p className="text-sm text-muted">
                        {t('A próxima é :title, :day, em :roadmap.', {
                            title: nextReview.title,
                            day: formatDate(nextReview.date),
                            roadmap: nextReview.roadmapId,
                        })}
                    </p>
                )}
            </div>
            <div className="flex flex-wrap gap-3">
                <ButtonLink href="/">{t('Ir para o painel')}</ButtonLink>
                <ButtonLink href="/roadmap" variant="secondary">
                    {t('Ver a trilha')}
                </ButtonLink>
            </div>
        </Card>
    );
}
