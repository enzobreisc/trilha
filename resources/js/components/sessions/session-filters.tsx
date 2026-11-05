import { SessionFilterGroup } from '@/components/sessions/session-filter-group';
import type { SessionPeriod } from '@/components/sessions/types';
import { useTranslation } from '@/hooks/use-translation';

export const ALL_ROADMAPS_FILTER = 'all';

export function SessionFilters({
    roadmaps,
    roadmapFilter,
    onRoadmapFilterChange,
    period,
    onPeriodChange,
}: {
    roadmaps: { id: string; name: string }[];
    roadmapFilter: string;
    onRoadmapFilterChange: (roadmapFilter: string) => void;
    period: SessionPeriod;
    onPeriodChange: (period: SessionPeriod) => void;
}) {
    const { t } = useTranslation();
    const roadmapOptions = [
        { value: ALL_ROADMAPS_FILTER, label: t('todos') },
        ...roadmaps.map((roadmap) => ({
            value: roadmap.id,
            label: roadmap.name,
        })),
    ];
    const periodOptions: { value: SessionPeriod; label: string }[] = [
        { value: '7d', label: t('7 dias') },
        { value: '30d', label: t('30 dias') },
        { value: 'all', label: t('tudo') },
    ];

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                <span className="w-16 font-mono text-xs text-muted">
                    {t('roadmap')}
                </span>
                <SessionFilterGroup
                    label={t('roadmap')}
                    options={roadmapOptions}
                    value={roadmapFilter}
                    onChange={onRoadmapFilterChange}
                />
            </div>
            <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                <span className="w-16 font-mono text-xs text-muted">
                    {t('período')}
                </span>
                <SessionFilterGroup
                    label={t('período')}
                    options={periodOptions}
                    value={period}
                    onChange={onPeriodChange}
                />
            </div>
        </div>
    );
}
