import { useTranslation } from '@/hooks/use-translation';
import type { TranslationKey } from '@/lib/i18n';
import { cn } from '@/lib/utils';

type AnswerTone = 'green' | 'amber';

const SELECTED_CLASSES: Record<AnswerTone, string> = {
    green: 'bg-accent text-bg',
    amber: 'bg-warn-fill text-warn inset-ring inset-ring-warn-line',
};

export function AnswerOption({
    label,
    isSelected,
    tone,
    onSelect,
}: {
    label: TranslationKey;
    isSelected: boolean;
    tone: AnswerTone;
    onSelect: () => void;
}) {
    const { t } = useTranslation();

    return (
        <button
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={onSelect}
            className={cn(
                'h-11 min-w-20 rounded-full px-5 text-sm font-bold transition-colors',
                isSelected
                    ? SELECTED_CLASSES[tone]
                    : 'text-secondary inset-ring inset-ring-strong hover:bg-active hover:text-text',
            )}
        >
            {t(label)}
        </button>
    );
}
