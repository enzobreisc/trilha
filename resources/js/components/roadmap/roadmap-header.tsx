import {
    allTopicsOf,
    countCompleted,
} from '@/components/roadmap/roadmap-progress';
import type { RoadmapData } from '@/components/roadmap/types';
import { SegmentedProgress } from '@/components/segmented-progress';
import { PageHeader } from '@/components/ui/page-header';
import { useChrome } from '@/hooks/use-chrome';
import { useTranslation } from '@/hooks/use-translation';

const PERCENT = 100;

export function RoadmapHeader({ data }: { data: RoadmapData }) {
    const { t } = useTranslation();
    const { roadmaps, currentRoadmapId } = useChrome();
    const roadmapName =
        roadmaps.find((roadmap) => roadmap.id === currentRoadmapId)?.name ??
        data.title;
    const topics = allTopicsOf(data.sections);
    const completedCount = countCompleted(topics);
    const percentDone =
        topics.length === 0
            ? 0
            : Math.round((completedCount / topics.length) * PERCENT);

    return (
        <PageHeader
            title={t('Trilha')}
            description={roadmapName}
            actions={
                <div className="flex w-full max-w-90 flex-col gap-1.5">
                    <div className="flex justify-between font-mono text-xs text-secondary">
                        <span>
                            {t(':done/:total concluídos', {
                                done: completedCount,
                                total: topics.length,
                            })}
                        </span>
                        <span>{percentDone}%</span>
                    </div>
                    <SegmentedProgress
                        filled={completedCount}
                        total={topics.length}
                    />
                </div>
            }
        />
    );
}
