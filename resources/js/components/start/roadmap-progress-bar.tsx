import { getProgressPercent } from '@/components/start/roadmap-progress';
import { useTranslation } from '@/hooks/use-translation';
import type { RoadmapSummary } from '@/types/roadmap';

export function RoadmapProgressBar({ roadmap }: { roadmap: RoadmapSummary }) {
    const { t } = useTranslation();
    const percent = getProgressPercent(roadmap);

    return (
        <div
            role="progressbar"
            aria-label={t(':done de :total', {
                done: roadmap.doneTopics,
                total: roadmap.totalTopics,
            })}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            className="h-1.5 overflow-hidden rounded-full bg-active"
        >
            <div
                className="h-full rounded-full bg-accent"
                style={{ width: `${percent}%` }}
            />
        </div>
    );
}
