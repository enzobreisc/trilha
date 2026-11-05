import { useTranslation } from '@/hooks/use-translation';
import type { TranslationKey } from '@/lib/i18n';
import { AnswerOption } from './answer-option';

export function ReviewQuestion({
    label,
    value,
    onChange,
}: {
    label: TranslationKey;
    value?: boolean;
    onChange: (value: boolean) => void;
}) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3 border-t border-border py-4">
            <span className="text-base font-semibold text-text">
                {t(label)}
            </span>
            <div role="radiogroup" aria-label={t(label)} className="flex gap-2">
                <AnswerOption
                    label="sim"
                    isSelected={value === true}
                    tone="green"
                    onSelect={() => onChange(true)}
                />
                <AnswerOption
                    label="não"
                    isSelected={value === false}
                    tone="amber"
                    onSelect={() => onChange(false)}
                />
            </div>
        </div>
    );
}
