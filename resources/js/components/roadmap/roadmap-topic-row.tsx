import { Link } from '@inertiajs/react';
import type { RoadmapTopic } from '@/components/roadmap/types';
import { StatusIcon, TOPIC_STATUS_LABEL_KEYS } from '@/components/status-icon';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

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

    return (
        <Link
            href={topic.href}
            className={cn(
                'flex h-10 items-center gap-3 rounded-sm px-3 text-sm transition-colors hover:bg-active/60',
                isStudying && 'bg-active',
            )}
        >
            <StatusIcon status={topic.status} size={14} />
            <span
                className={cn(
                    'min-w-0 flex-1 truncate font-medium',
                    isStudying ? 'font-semibold text-text' : 'text-secondary',
                )}
            >
                {topic.title}
            </span>
            <span className="w-24 shrink-0 text-xs font-medium text-muted">
                {t(TOPIC_STATUS_LABEL_KEYS[topic.status])}
            </span>
            <span className="w-16 shrink-0 text-right font-mono text-xs text-faint">
                {formatStatusDate()}
            </span>
        </Link>
    );
}
