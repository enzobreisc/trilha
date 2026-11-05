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
                'h-1.5 w-full appearance-none overflow-hidden rounded-full',
                '[&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-active',
                '[&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-accent',
                '[&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-accent',
                className,
            )}
        />
    );
}
