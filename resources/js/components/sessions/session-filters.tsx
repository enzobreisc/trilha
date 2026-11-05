import {
    PillRadioGroup,
    type RadioOption,
} from '@/components/settings/pill-radio-group';
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
    const roadmapOptions: RadioOption<string>[] = [
        { value: ALL_ROADMAPS_FILTER, label: t('todos') },
        ...roadmaps.map((roadmap) => ({
            value: roadmap.id,
            label: roadmap.name,
        })),
    ];
    const periodOptions: RadioOption<SessionPeriod>[] = [
        { value: '7d', label: t('7 dias') },
        { value: '30d', label: t('30 dias') },
        { value: 'all', label: t('tudo') },
    ];

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="w-16 text-sm font-semibold text-faint">
                    {t('roadmap')}
                </span>
                <PillRadioGroup
                    label={t('roadmap')}
                    options={roadmapOptions}
                    value={roadmapFilter}
                    onChange={onRoadmapFilterChange}
                />
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="w-16 text-sm font-semibold text-faint">
                    {t('período')}
                </span>
                <PillRadioGroup
                    label={t('período')}
                    options={periodOptions}
                    value={period}
                    onChange={onPeriodChange}
                />
            </div>
        </div>
    );
}
