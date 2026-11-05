import { getRoadmapState } from '@/components/start/roadmap-progress';
import { RoadmapCardFooter } from '@/components/start/roadmap-card-footer';
import { RoadmapProgressBar } from '@/components/start/roadmap-progress-bar';
import { RoadmapStatusLine } from '@/components/start/roadmap-status-line';
import { RoadmapTitleLine } from '@/components/start/roadmap-title-line';
import { cn } from '@/lib/utils';
import type { RoadmapSummary } from '@/types/roadmap';

export function RoadmapCard({
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
                'flex flex-col gap-4 rounded-md p-5',
                isLastStudied
                    ? 'bg-elevated inset-ring inset-ring-strong'
                    : 'bg-surface inset-ring inset-ring-border',
            )}
        >
            <RoadmapTitleLine roadmap={roadmap} />
            <RoadmapProgressBar roadmap={roadmap} />
            <RoadmapStatusLine roadmap={roadmap} state={state} />
            <RoadmapCardFooter roadmap={roadmap} state={state} />
        </article>
    );
}
