import { Link } from '@inertiajs/react';
import type { RoadmapTopic } from '@/components/roadmap/types';
import { StatusIcon, TOPIC_STATUS_LABEL_KEYS } from '@/components/status-icon';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import type { TopicStatus } from '@/types/topic';

const TITLE_CLASS_BY_STATUS: Record<TopicStatus, string> = {
    todo: 'text-text',
    studying: 'font-bold text-text',
    review: 'text-text',
    done: 'text-muted line-through',
};

export function RoadmapTopicRow({
    topic,
    today,
}: {
    topic: RoadmapTopic;
    today: string;
}) {
    const { t, shortDate, relativeDay } = useTranslation();
    const isStudying = topic.status === 'studying';

    function formatStatusDate(): string {
        if (topic.statusDate === null) {
            return '—';
        }
        return topic.statusDate === today
            ? relativeDay(0)
            : shortDate(topic.statusDate);
    }

    function describeStatus(): string {
        if (topic.status === 'studying' || topic.status === 'review') {
            return t(TOPIC_STATUS_LABEL_KEYS[topic.status]);
        }
        return formatStatusDate();
    }

    return (
        <Link
            href={topic.href}
            className={cn(
                'flex h-10 items-center gap-3 border-l-[3px] px-3 font-mono text-[13px] transition-colors hover:bg-active/60',
                isStudying
                    ? 'border-accent bg-accent/10'
                    : 'border-transparent',
            )}
        >
            <StatusIcon status={topic.status} size={14} />
            <span
                className={cn(
                    'min-w-0 flex-1 truncate',
                    TITLE_CLASS_BY_STATUS[topic.status],
                )}
            >
                {topic.title}
            </span>
            <span
                className={cn(
                    'w-28 shrink-0 text-right text-xs',
                    topic.status === 'review' ? 'text-review' : 'text-muted',
                )}
            >
                {describeStatus()}
            </span>
        </Link>
    );
}
