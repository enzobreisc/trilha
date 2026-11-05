import { cn } from '@/lib/utils';
import type { HeatLevel } from '@/types/contribution';

const HEAT_CLASSES: Record<HeatLevel, string> = {
    0: 'bg-heat-0',
    1: 'bg-heat-1',
    2: 'bg-heat-2',
    3: 'bg-heat-3',
    4: 'bg-heat-4',
};

export function ContributionHeatmap({
    levels,
    label,
}: {
    levels: HeatLevel[];
    label: string;
}) {
    return (
        <div
            role="img"
            aria-label={label}
            className="grid auto-cols-fr grid-flow-col grid-rows-7 gap-1"
        >
            {levels.map((level, index) => (
                <span
                    key={index}
                    className={cn('aspect-square rounded', HEAT_CLASSES[level])}
                />
            ))}
        </div>
    );
}
