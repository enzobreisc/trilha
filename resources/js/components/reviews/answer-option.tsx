import { useTranslation } from '@/hooks/use-translation';
import type { TranslationKey } from '@/lib/i18n';
import { cn } from '@/lib/utils';

type AnswerTone = 'green' | 'amber';

const SELECTED_CLASSES: Record<AnswerTone, string> = {
    green: 'border-accent bg-accent text-bg',
    amber: 'border-warn-line bg-warn-fill text-warn',
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
                'h-9 min-w-20 rounded-sm border px-4 font-mono text-[13px] font-medium transition-colors',
                isSelected
                    ? SELECTED_CLASSES[tone]
                    : 'border-leader text-text hover:bg-active',
            )}
        >
            {t(label)}
        </button>
    );
}
