import { Card } from '@/components/ui/card';
import { DataRow } from '@/components/ui/data-row';
import { useTranslation } from '@/hooks/use-translation';
import type { UpcomingReview } from './types';

export function ReviewUpcoming({ reviews }: { reviews: UpcomingReview[] }) {
    const { t, weekdayAndDay } = useTranslation();

    return (
        <Card title={t('próximos dias')} aside={t('todos os roadmaps')}>
            {reviews.map((review) => (
                <DataRow
                    key={`${review.date}-${review.title}`}
                    label={
                        <span className="flex items-center gap-3">
                            <span className="w-14 shrink-0 font-mono text-xs text-muted">
                                {weekdayAndDay(review.date)}
                            </span>
                            {review.title}
                        </span>
                    }
                    value={
                        <span className="font-mono text-xs text-review">
                            {review.interval}
                        </span>
                    }
                />
            ))}
        </Card>
    );
}
