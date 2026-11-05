import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import { ALL_ROADMAPS_FILTER } from './find-review-roadmaps';
import type { ReviewRoadmap } from './find-review-roadmaps';

export function ReviewRoadmapFilter({
    roadmaps,
    activeFilter,
    totalCount,
    onPick,
}: {
    roadmaps: ReviewRoadmap[];
    activeFilter: string;
    totalCount: number;
    onPick: (filter: string) => void;
}) {
    const { t } = useTranslation();
    const options = [
        { id: ALL_ROADMAPS_FILTER, label: t('todos'), count: totalCount },
        ...roadmaps.map((roadmap) => ({
            id: roadmap.id,
            label: roadmap.id,
            count: roadmap.count,
        })),
    ];

    return (
        <div
            role="group"
            aria-label={t('Filtrar por roadmap')}
            className="flex flex-wrap gap-2"
        >
            {options.map((option) => {
                const isActive = option.id === activeFilter;
                return (
                    <button
                        key={option.id}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => onPick(option.id)}
                        className={cn(
                            'inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors',
                            isActive
                                ? 'bg-active text-white'
                                : 'text-secondary inset-ring inset-ring-border hover:bg-active/60 hover:text-text',
                        )}
                    >
                        {option.label}
                        <span className="font-mono text-xs text-muted">
                            {option.count}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
