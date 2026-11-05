import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

export function SegmentedProgress({
    filled,
    total,
    className,
}: {
    filled: number;
    total: number;
    className?: string;
}) {
    const { t } = useTranslation();

    return (
        <progress
            value={filled}
            max={Math.max(total, 1)}
            aria-label={t(':filled de :total', { filled, total })}
            className={cn(
                'h-1.5 w-full appearance-none overflow-hidden rounded-xs',
                '[&::-webkit-progress-bar]:rounded-xs [&::-webkit-progress-bar]:bg-active',
                '[&::-webkit-progress-value]:rounded-xs [&::-webkit-progress-value]:bg-success',
                '[&::-moz-progress-bar]:rounded-xs [&::-moz-progress-bar]:bg-success',
                className,
            )}
        />
    );
}
