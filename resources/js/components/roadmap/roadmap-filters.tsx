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
            className="flex flex-wrap gap-2"
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
                            'inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-colors',
                            isActive
                                ? 'bg-active text-white'
                                : 'text-secondary hover:bg-active/60 hover:text-text',
                        )}
                    >
                        {t(label)}
                        <span
                            className={cn(
                                'font-mono text-xs',
                                isActive ? 'text-muted' : 'text-faint',
                            )}
                        >
                            {counts[value]}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
