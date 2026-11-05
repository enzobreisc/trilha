import type { RoadmapState } from '@/components/start/roadmap-progress';
import { RoadmapStatusContent } from '@/components/start/roadmap-status-content';
import type { RoadmapSummary } from '@/types/roadmap';

export function RoadmapStatusLine({
    roadmap,
    state,
}: {
    roadmap: RoadmapSummary;
    state: RoadmapState;
}) {
    return (
        <p className="min-w-0 flex-1 basis-56 font-mono text-xs text-muted">
            <RoadmapStatusContent roadmap={roadmap} state={state} />
        </p>
    );
}
