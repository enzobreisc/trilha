import { useReviewDateLabel } from '@/components/topic/use-review-date-label';
import { Card } from '@/components/ui/card';
import { DataRow } from '@/components/ui/data-row';
import { useTranslation } from '@/hooks/use-translation';
import type { TopicSchedule } from '@/lib/sample/topic';
import type { TopicStatus } from '@/types/topic';

export function NextReviewsSection({
    status,
    schedule,
}: {
    status: TopicStatus;
    schedule: TopicSchedule;
}) {
    const { t } = useTranslation();
    const reviewDateLabel = useReviewDateLabel(status);

    return (
        <Card title={t('próximas revisões')}>
            <DataRow
                label={
                    <span className="flex items-center gap-2.5">
                        <span
                            aria-hidden="true"
                            className="size-2 rounded-full bg-accent"
                        />
                        {t('7 dias')}
                    </span>
                }
                value={reviewDateLabel(schedule.seven_day_review_on)}
            />
            <DataRow
                label={
                    <span className="flex items-center gap-2.5">
                        <span
                            aria-hidden="true"
                            className="size-2 rounded-full bg-active inset-ring inset-ring-strong"
                        />
                        {t('30 dias')}
                    </span>
                }
                value={reviewDateLabel(schedule.thirty_day_review_on)}
            />
        </Card>
    );
}
