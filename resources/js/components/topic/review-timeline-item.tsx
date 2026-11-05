import { cn } from '@/lib/utils';

export function ReviewTimelineItem({
    label,
    date,
    isReached,
    isLast,
}: {
    label: string;
    date: string;
    isReached: boolean;
    isLast: boolean;
}) {
    return (
        <li className="flex gap-4">
            <div className="flex flex-col items-center gap-1.5 pt-1.5">
                <span
                    aria-hidden="true"
                    className={cn(
                        'size-2.5 shrink-0 rounded-full',
                        isReached
                            ? 'bg-accent'
                            : 'bg-active inset-ring inset-ring-strong',
                    )}
                />
                {!isLast && (
                    <span
                        aria-hidden="true"
                        className="w-px flex-1 bg-border"
                    />
                )}
            </div>
            <div
                className={cn(
                    'flex min-w-0 flex-1 items-center justify-between gap-4 text-sm',
                    !isLast && 'pb-5',
                )}
            >
                <span className="font-medium text-secondary">{label}</span>
                <span className="font-semibold text-text">{date}</span>
            </div>
        </li>
    );
}
