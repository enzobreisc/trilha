import { getProgressPercent } from '@/components/start/roadmap-progress';
import { useTranslation } from '@/hooks/use-translation';
import type { RoadmapSummary } from '@/types/roadmap';

export function RoadmapProgressBar({ roadmap }: { roadmap: RoadmapSummary }) {
    const { t } = useTranslation();
    const percent = getProgressPercent(roadmap);

    return (
        <div className="flex min-w-40 flex-1 flex-col gap-1.5">
            <div
                role="progressbar"
                aria-label={t(':done de :total', {
                    done: roadmap.doneTopics,
                    total: roadmap.totalTopics,
                })}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percent}
                className="h-0.75 overflow-hidden rounded-xs bg-active"
            >
                <div
                    className="h-full bg-success"
                    style={{ width: `${percent}%` }}
                />
            </div>
            <span className="font-mono text-xs text-secondary">
                <span className="font-semibold text-text">
                    {roadmap.doneTopics}
                </span>
                /{roadmap.totalTopics} · {percent}%
            </span>
        </div>
    );
}
