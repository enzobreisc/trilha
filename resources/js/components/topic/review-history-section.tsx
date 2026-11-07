import { ReviewTimelineItem } from '@/components/topic/review-timeline-item';
import { TopicSection } from '@/components/topic/topic-section';
import type { TopicDetail } from '@/components/topic/types';
import { useTranslation } from '@/hooks/use-translation';

export function ReviewHistorySection({ topic }: { topic: TopicDetail }) {
    const { t, shortDate } = useTranslation();
    const scheduled = topic.reviews.map((review) => ({
        id: review.id,
        days: review.intervalDays,
        date: shortDate(review.dueOn),
        isReached: review.outcome !== null,
    }));
    const upcoming = topic.reviewIntervals.map((days) => ({
        id: String(days),
        days,
        date: t('ao concluir'),
        isReached: false,
    }));

    return (
        <TopicSection title={t('revisões')}>
            <ol className="m-0 flex list-none flex-col gap-1 p-0">
                <ReviewTimelineItem
                    label={t('iniciado')}
                    date={topic.startedOn ? shortDate(topic.startedOn) : '—'}
                    isReached={topic.startedOn !== null}
                />
                {(scheduled.length > 0 ? scheduled : upcoming).map((review) => (
                    <ReviewTimelineItem
                        key={review.id}
                        label={t('revisão de :days dias', {
                            days: review.days,
                        })}
                        date={review.date}
                        isReached={review.isReached}
                    />
                ))}
            </ol>
            <p className="m-0 font-mono text-xs text-muted">
                {t(
                    'As revisões só são agendadas quando o tópico vira concluído.',
                )}
            </p>
        </TopicSection>
    );
}
