import { DataRow } from '@/components/ui/data-row';

export function ReviewTimelineItem({
    label,
    date,
    isReached,
}: {
    label: string;
    date: string;
    isReached: boolean;
}) {
    return (
        <li>
            <DataRow
                label={
                    <span className="flex items-baseline gap-2">
                        <span
                            aria-hidden="true"
                            className={isReached ? 'text-accent' : 'text-faint'}
                        >
                            {isReached ? '●' : '○'}
                        </span>
                        {label}
                    </span>
                }
                value={date}
            />
        </li>
    );
}
