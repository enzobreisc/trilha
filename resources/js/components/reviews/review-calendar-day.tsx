import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import type { ReviewDay } from './types';

const HEAT_CLASSES = [
    'bg-heat-0 text-muted',
    'bg-heat-1 text-secondary',
    'bg-heat-2 text-text',
    'bg-heat-3 text-bg',
];

export function ReviewCalendarDay({
    day,
    count,
}: {
    day: ReviewDay;
    count: number;
}) {
    const { t, weekdayAndDay } = useTranslation();
    const heatClass = HEAT_CLASSES[Math.min(count, HEAT_CLASSES.length - 1)];

    return (
        <div className="flex min-w-0 flex-col items-center gap-2">
            <span
                className={cn(
                    'w-full truncate text-center text-xs font-semibold',
                    day.isToday ? 'text-text' : 'text-faint',
                )}
            >
                {day.isToday ? t('hoje') : weekdayAndDay(day.date)}
            </span>
            <span
                className={cn(
                    'flex h-14 w-full items-center justify-center rounded-sm font-mono text-sm font-bold',
                    heatClass,
                    day.isToday && 'inset-ring-2 inset-ring-accent',
                )}
            >
                {count}
            </span>
        </div>
    );
}
