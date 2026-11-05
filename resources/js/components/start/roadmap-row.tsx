import { getRoadmapState } from '@/components/start/roadmap-progress';
import { RoadmapCardFooter } from '@/components/start/roadmap-card-footer';
import { RoadmapProgressBar } from '@/components/start/roadmap-progress-bar';
import { RoadmapStatusLine } from '@/components/start/roadmap-status-line';
import { RoadmapTitleLine } from '@/components/start/roadmap-title-line';
import { cn } from '@/lib/utils';
import type { RoadmapSummary } from '@/types/roadmap';

export function RoadmapRow({
    roadmap,
    isLastStudied,
}: {
    roadmap: RoadmapSummary;
    isLastStudied: boolean;
}) {
    const state = getRoadmapState(roadmap);

    return (
        <article
            className={cn(
                'flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-l-3 border-border px-5 py-4 last:border-b-0',
                isLastStudied
                    ? 'border-l-accent bg-primary/15'
                    : 'border-l-transparent',
            )}
        >
            <RoadmapTitleLine roadmap={roadmap} isLastStudied={isLastStudied} />
            <RoadmapProgressBar roadmap={roadmap} />
            <RoadmapStatusLine roadmap={roadmap} state={state} />
            <RoadmapCardFooter roadmap={roadmap} state={state} />
        </article>
    );
}
