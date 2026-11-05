import { getProgressPercent } from '@/components/start/roadmap-progress';
import type { RoadmapSummary } from '@/types/roadmap';

export function RoadmapTitleLine({ roadmap }: { roadmap: RoadmapSummary }) {
    return (
        <header className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 flex-col gap-0.5">
                <h3 className="truncate font-display text-lg font-semibold">
                    {roadmap.name}
                </h3>
                <span className="text-xs font-medium text-faint">
                    {roadmap.subtitle}
                </span>
            </div>
            <span className="shrink-0 font-mono text-sm text-muted">
                <span className="font-semibold text-text">
                    {roadmap.doneTopics}
                </span>
                /{roadmap.totalTopics} · {getProgressPercent(roadmap)}%
            </span>
        </header>
    );
}
