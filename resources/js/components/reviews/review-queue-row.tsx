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
                'flex w-full items-center gap-3 rounded-sm px-3 py-3 text-left transition-colors hover:bg-active/60',
                isSelected && 'bg-active hover:bg-active',
            )}
        >
            <ReviewStatusIcon outcome={outcome} />
            <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span
                    className={cn(
                        'truncate font-semibold',
                        isSelected && 'text-white',
                        !isSelected && outcome === 'ok' && 'text-faint',
                        !isSelected && outcome !== 'ok' && 'text-text',
                    )}
                >
                    {item.title}
                </span>
                <span className="text-xs font-medium text-faint">
                    {item.roadmapId}
                </span>
            </span>
            <span className="rounded-full bg-elevated px-2.5 py-1 font-mono text-xs text-accent">
                {item.interval}
            </span>
        </button>
    );
}
