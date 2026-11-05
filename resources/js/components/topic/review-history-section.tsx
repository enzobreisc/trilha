import { ReviewTimelineItem } from '@/components/topic/review-timeline-item';
import { useReviewDateLabel } from '@/components/topic/use-review-date-label';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import type { TopicSchedule } from '@/lib/sample/topic';
import type { TopicStatus } from '@/types/topic';

export function ReviewHistorySection({
    status,
    schedule,
}: {
    status: TopicStatus;
    schedule: TopicSchedule;
}) {
    const { t } = useTranslation();
    const reviewDateLabel = useReviewDateLabel(status);
    const isDone = status === 'done';

    return (
        <Card title={t('revisões')}>
            <ol className="m-0 flex list-none flex-col p-0">
                <ReviewTimelineItem
                    label={t('iniciado')}
                    date={schedule.started_on}
                    isReached
                    isLast={false}
                />
                <ReviewTimelineItem
                    label={t('revisão de 7 dias')}
                    date={reviewDateLabel(schedule.seven_day_review_on)}
                    isReached={isDone}
                    isLast={false}
                />
                <ReviewTimelineItem
                    label={t('revisão de 30 dias')}
                    date={reviewDateLabel(schedule.thirty_day_review_on)}
                    isReached={isDone}
                    isLast
                />
            </ol>
            <p className="m-0 text-xs text-faint">
                {t(
                    'As revisões só são agendadas quando o tópico vira concluído.',
                )}
            </p>
        </Card>
    );
}
