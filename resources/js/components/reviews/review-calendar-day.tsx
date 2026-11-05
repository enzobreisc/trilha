import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import type { ReviewDay } from './types';

export function ReviewCalendarDay({
    day,
    count,
    maxCount,
}: {
    day: ReviewDay;
    count: number;
    maxCount: number;
}) {
    const { t, weekdayAndDay } = useTranslation();
    const barHeightPercent = (count / maxCount) * 100;

    return (
        <div className="flex min-w-0 flex-col items-center gap-2">
            <div className="flex h-12 w-full items-end">
                <div
                    className={cn(
                        'w-full rounded-xs',
                        day.isToday ? 'bg-success' : 'bg-footer',
                    )}
                    style={{ height: `${barHeightPercent}%` }}
                />
            </div>
            <span className="font-mono text-xs text-text">{count}</span>
            <span
                className={cn(
                    'w-full truncate text-center font-mono text-[10px]',
                    day.isToday ? 'text-success' : 'text-muted',
                )}
            >
                {day.isToday ? t('hoje') : weekdayAndDay(day.date)}
            </span>
        </div>
    );
}
