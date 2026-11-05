import { cn } from '@/lib/utils';
import type { RoadmapSummary } from '@/types/roadmap';

export function RoadmapTitleLine({
    roadmap,
    isLastStudied,
}: {
    roadmap: RoadmapSummary;
    isLastStudied: boolean;
}) {
    return (
        <div className="flex w-52 max-w-full min-w-0 flex-col gap-0.5">
            <h3
                className={cn(
                    'truncate font-mono text-sm font-bold',
                    isLastStudied ? 'text-accent' : 'text-text',
                )}
            >
                {roadmap.name}
            </h3>
            <span className="truncate font-mono text-xs text-muted">
                {roadmap.subtitle}
            </span>
        </div>
    );
}
