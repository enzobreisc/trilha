import { EllipsisIcon } from '@/components/start/ellipsis-icon';
import type { ManagedRoadmap } from '@/components/manage-roadmap/types';
import { useTranslation } from '@/hooks/use-translation';

export function ArchivedRoadmapRow({
    roadmap,
    onManage,
}: {
    roadmap: ManagedRoadmap;
    onManage: () => void;
}) {
    const { t } = useTranslation();

    return (
        <div className="flex items-center gap-3 px-5 py-2.5 font-mono text-xs text-muted">
            <span className="min-w-0 flex-1 truncate">{roadmap.name}</span>
            <span>
                {roadmap.completedTopics}/{roadmap.totalTopics}
            </span>
            <button
                type="button"
                aria-label={t('Gerenciar roadmap')}
                onClick={onManage}
                className="flex size-7 items-center justify-center rounded-xs text-muted hover:bg-active hover:text-text"
            >
                <EllipsisIcon />
            </button>
        </div>
    );
}
