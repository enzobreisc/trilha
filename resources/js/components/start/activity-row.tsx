import type { StartActivityEntry } from '@/components/start/types';
import { useTranslation } from '@/hooks/use-translation';
import { daysBetween } from '@/lib/dates';
import { cn } from '@/lib/utils';

const RECENT_DAYS = 1;

export function ActivityRow({
    entry,
    today,
}: {
    entry: StartActivityEntry;
    today: string;
}) {
    const { t, relativeDay, shortDate } = useTranslation();
    const daysAgo = daysBetween(entry.date, today);
    const isRecent = daysAgo <= RECENT_DAYS;
    const dayLabel = isRecent ? relativeDay(daysAgo) : shortDate(entry.date);
    const when = [dayLabel, entry.time].filter(Boolean).join(' ');

    return (
        <li className="flex items-start gap-3 border-b border-border py-2.5 text-sm last:border-b-0">
            <span
                aria-hidden="true"
                className={cn(
                    'mt-1.5 size-2 shrink-0 rounded-full',
                    isRecent ? 'bg-accent' : 'bg-primary',
                )}
            />
            <span className="w-20 shrink-0 font-mono text-xs whitespace-nowrap text-muted">
                {when}
            </span>
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="truncate font-mono text-xs text-accent">
                    {entry.roadmapId}
                </span>
                <span className="truncate text-secondary">
                    {entry.topicTitle} ·{' '}
                    {t('sessão :minutes min', { minutes: entry.minutes })}
                </span>
            </span>
        </li>
    );
}
