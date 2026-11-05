import { daysBetween } from '@/components/start/days-between';
import type {
    ActivityTone,
    StartActivityEntry,
} from '@/components/start/types';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

const TONE_CLASSES: Record<ActivityTone, string> = {
    bright: 'bg-accent',
    mid: 'bg-primary',
};

export function ActivityRow({
    entry,
    today,
}: {
    entry: StartActivityEntry;
    today: string;
}) {
    const { relativeDay, shortDate } = useTranslation();
    const daysAgo = daysBetween(entry.date, today);
    const dayLabel =
        daysAgo <= 1 ? relativeDay(daysAgo) : shortDate(entry.date);
    const when = [dayLabel, entry.time].filter(Boolean).join(' ');

    return (
        <li className="flex min-h-10 items-center gap-3 border-b border-border text-sm last:border-b-0">
            <span
                aria-hidden="true"
                className={cn(
                    'size-2 shrink-0 rounded-full',
                    TONE_CLASSES[entry.tone],
                )}
            />
            <span className="w-28 shrink-0 text-xs whitespace-nowrap text-muted">
                {when}
            </span>
            <span className="w-52 shrink-0 truncate font-medium text-text">
                {entry.roadmapSlug}
            </span>
            <span className="min-w-0 flex-1 truncate text-secondary">
                {entry.detail}
            </span>
        </li>
    );
}
