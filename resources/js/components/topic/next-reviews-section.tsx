import { TopicSection } from '@/components/topic/topic-section';
import { useReviewDateLabel } from '@/components/topic/use-review-date-label';
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
        <TopicSection title={t('próximas revisões')}>
            <DataRow
                label={
                    <span className="flex items-baseline gap-2">
                        <span aria-hidden="true" className="text-accent">
                            ◇
                        </span>
                        {t('7 dias')}
                    </span>
                }
                value={reviewDateLabel(schedule.seven_day_review_on)}
            />
            <DataRow
                label={
                    <span className="flex items-baseline gap-2">
                        <span aria-hidden="true" className="text-faint">
                            ○
                        </span>
                        {t('30 dias')}
                    </span>
                }
                value={reviewDateLabel(schedule.thirty_day_review_on)}
            />
        </TopicSection>
    );
}
