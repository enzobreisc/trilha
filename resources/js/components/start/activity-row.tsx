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
        <li className="flex items-start gap-3 border-b border-border py-2.5 text-sm last:border-b-0">
            <span
                aria-hidden="true"
                className={cn(
                    'mt-1.5 size-2 shrink-0 rounded-full',
                    TONE_CLASSES[entry.tone],
                )}
            />
            <span className="w-20 shrink-0 font-mono text-xs whitespace-nowrap text-muted">
                {when}
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate font-mono text-xs text-accent">
                    {entry.roadmapSlug}
                </span>
                <span className="truncate text-secondary">{entry.detail}</span>
            </span>
        </li>
    );
}
