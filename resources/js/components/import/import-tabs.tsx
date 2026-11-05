import { useTranslation } from '@/hooks/use-translation';
import type { TranslationKey } from '@/lib/i18n';
import type { ImportMode } from '@/lib/sample/import';
import { cn } from '@/lib/utils';

export const IMPORT_MODE_LABELS: Record<ImportMode, TranslationKey> = {
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
            className="inline-flex w-fit gap-1 rounded-full bg-elevated p-1 inset-ring inset-ring-border"
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
                            'h-9 rounded-full px-4 text-sm font-semibold transition-colors',
                            isSelected
                                ? 'bg-active text-white'
                                : 'text-muted hover:text-secondary',
                        )}
                    >
                        {t(IMPORT_MODE_LABELS[tabMode])}
                    </button>
                );
            })}
        </div>
    );
}
