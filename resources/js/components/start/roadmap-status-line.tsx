import { RoadmapStatusContent } from '@/components/start/roadmap-status-content';
import type { RoadmapState } from '@/components/start/roadmap-progress';
import type { RoadmapSummary } from '@/types/roadmap';

export function RoadmapStatusLine({
    roadmap,
    state,
}: {
    roadmap: RoadmapSummary;
    state: RoadmapState;
}) {
    return (
        <p className="text-sm font-medium text-muted">
            <RoadmapStatusContent roadmap={roadmap} state={state} />
        </p>
    );
}
