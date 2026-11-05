import { ReviewTimelineItem } from '@/components/topic/review-timeline-item';
import { TopicSection } from '@/components/topic/topic-section';
import { useReviewDateLabel } from '@/components/topic/use-review-date-label';
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
        <TopicSection title={t('revisões')}>
            <ol className="m-0 flex list-none flex-col gap-1 p-0">
                <ReviewTimelineItem
                    label={t('iniciado')}
                    date={schedule.started_on}
                    isReached
                />
                <ReviewTimelineItem
                    label={t('revisão de 7 dias')}
                    date={reviewDateLabel(schedule.seven_day_review_on)}
                    isReached={isDone}
                />
                <ReviewTimelineItem
                    label={t('revisão de 30 dias')}
                    date={reviewDateLabel(schedule.thirty_day_review_on)}
                    isReached={isDone}
                />
            </ol>
            <p className="m-0 font-mono text-xs text-muted">
                {t(
                    'As revisões só são agendadas quando o tópico vira concluído.',
                )}
            </p>
        </TopicSection>
    );
}
