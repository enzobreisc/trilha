import type { RoadmapFilter } from '@/components/roadmap/types';
import { useTranslation } from '@/hooks/use-translation';
import type { TranslationKey } from '@/lib/i18n';
import { cn } from '@/lib/utils';

const FILTER_OPTIONS: { value: RoadmapFilter; label: TranslationKey }[] = [
    { value: 'all', label: 'todos' },
    { value: 'todo', label: 'a fazer' },
    { value: 'studying', label: 'estudando' },
    { value: 'review', label: 'revisar' },
    { value: 'done', label: 'concluídos' },
];

export function RoadmapFilters({
    activeFilter,
    counts,
    onPick,
}: {
    activeFilter: RoadmapFilter;
    counts: Record<RoadmapFilter, number>;
    onPick: (filter: RoadmapFilter) => void;
}) {
    const { t } = useTranslation();

    return (
        <div
            role="group"
            aria-label={t('Filtrar tópicos')}
            className="flex flex-wrap gap-x-6 gap-y-2 border-b border-border font-mono text-[13px]"
        >
            {FILTER_OPTIONS.map(({ value, label }) => {
                const isActive = value === activeFilter;
                return (
                    <button
                        key={value}
                        type="button"
                        aria-pressed={isActive}
                        onClick={() => onPick(value)}
                        className={cn(
                            '-mb-px inline-flex items-baseline gap-2 border-b-2 px-0.5 pb-2 transition-colors',
                            isActive
                                ? 'border-accent font-bold text-text'
                                : 'border-transparent text-muted hover:text-secondary',
                        )}
                    >
                        {t(label)}
                        <span className="text-xs text-muted">
                            {counts[value]}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
