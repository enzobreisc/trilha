import { useTranslation } from '@/hooks/use-translation';
import type { TranslationKey } from '@/lib/i18n';
import type { ImportMode } from '@/lib/sample/import';
import { cn } from '@/lib/utils';

const IMPORT_MODE_LABELS: Record<ImportMode, TranslationKey> = {
    new: 'novo roadmap',
    update: 'atualizar existente',
};

const IMPORT_MODES: ImportMode[] = ['new', 'update'];

export function ImportTabs({
    mode,
    onSelect,
}: {
    mode: ImportMode;
    onSelect: (mode: ImportMode) => void;
}) {
    const { t } = useTranslation();

    return (
        <div
            role="tablist"
            aria-label={t('Tipo de importação')}
            className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs"
        >
            {IMPORT_MODES.map((tabMode) => {
                const isSelected = tabMode === mode;
                return (
                    <button
                        key={tabMode}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => onSelect(tabMode)}
                        className={cn(
                            'transition-colors',
                            isSelected
                                ? 'font-bold text-text'
                                : 'text-muted hover:text-secondary',
                        )}
                    >
                        <span aria-hidden="true">
                            {isSelected ? '(•)' : '( )'}
                        </span>{' '}
                        {t(IMPORT_MODE_LABELS[tabMode])}
                    </button>
                );
            })}
        </div>
    );
}
