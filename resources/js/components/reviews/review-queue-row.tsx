import { cn } from '@/lib/utils';
import { ReviewStatusIcon } from './review-status-icon';
import type { ReviewItem, ReviewOutcome } from './types';

export function ReviewQueueRow({
    item,
    outcome,
    isSelected,
    onSelect,
}: {
    item: ReviewItem;
    outcome?: ReviewOutcome;
    isSelected: boolean;
    onSelect: () => void;
}) {
    return (
        <button
            type="button"
            aria-pressed={isSelected}
            onClick={onSelect}
            className={cn(
                'flex w-full items-baseline gap-3 border-l-3 px-3 py-2 text-left transition-colors hover:bg-active',
                isSelected
                    ? 'border-l-accent bg-primary/25'
                    : 'border-l-transparent',
            )}
        >
            <span
                aria-hidden="true"
                className="w-3 shrink-0 font-mono text-accent"
            >
                {isSelected ? '❯' : ''}
            </span>
            <ReviewStatusIcon outcome={outcome} />
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span
                    className={cn(
                        'truncate font-semibold',
                        outcome === 'ok' && !isSelected
                            ? 'text-faint'
                            : 'text-text',
                    )}
                >
                    {item.title}
                </span>
                <span className="font-mono text-xs text-muted">
                    {item.roadmapId}
                </span>
            </span>
            <span className="font-mono text-xs text-review">
                {item.interval}
            </span>
        </button>
    );
}
