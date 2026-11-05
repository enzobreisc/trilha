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
            className="flex flex-wrap items-baseline gap-x-5 gap-y-2 font-mono text-xs"
        >
            <span className="text-muted">{t('roadmap')}</span>
            {options.map((option) => {
                const isActive = option.id === activeFilter;
                return (
                    <button
                        key={option.id}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => onPick(option.id)}
                        className={cn(
                            'inline-flex items-center gap-2 transition-colors',
                            isActive
                                ? 'font-bold text-text'
                                : 'text-muted hover:text-text',
                        )}
                    >
                        <span aria-hidden="true">
                            {isActive ? '(•)' : '( )'}
                        </span>
                        {option.label}
                        <span className="text-muted">{option.count}</span>
                    </button>
                );
            })}
        </div>
    );
}
