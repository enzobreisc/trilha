import { TopicSection } from '@/components/topic/topic-section';
import type { TopicDetail } from '@/components/topic/types';
import { DataRow } from '@/components/ui/data-row';
import { useTranslation } from '@/hooks/use-translation';

export function NextReviewsSection({ topic }: { topic: TopicDetail }) {
    const { t, shortDate } = useTranslation();
    const pendingReviews = topic.reviews.filter(
        (review) => review.outcome === null,
    );
    const rows =
        pendingReviews.length > 0
            ? pendingReviews.map((review) => ({
                  id: review.id,
                  days: review.intervalDays,
                  date: shortDate(review.dueOn),
              }))
            : topic.reviewIntervals.map((days) => ({
                  id: String(days),
                  days,
                  date: t('ao concluir'),
              }));

    return (
        <TopicSection title={t('próximas revisões')}>
            {rows.map((row, index) => (
                <DataRow
                    key={row.id}
                    label={
                        <span className="flex items-baseline gap-2">
                            <span
                                aria-hidden="true"
                                className={
                                    index === 0 ? 'text-accent' : 'text-faint'
                                }
                            >
                                {index === 0 ? '◇' : '○'}
                            </span>
                            {t(':count dias', { count: row.days })}
                        </span>
                    }
                    value={row.date}
                />
            ))}
        </TopicSection>
    );
}
