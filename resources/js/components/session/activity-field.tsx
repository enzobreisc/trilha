import { useId } from 'react';
import { FieldCaption } from '@/components/session/field-caption';
import type {
    SessionActivity,
    SessionActivityOption,
} from '@/components/session/types';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

export function ActivityField({
    options,
    value,
    onToggle,
}: {
    options: SessionActivityOption[];
    value: SessionActivity[];
    onToggle: (activity: SessionActivity) => void;
}) {
    const { t } = useTranslation();
    const captionId = useId();

    return (
        <div className="flex flex-col gap-2">
            <FieldCaption id={captionId}>{t('o que você fez')}</FieldCaption>
            <div
                role="group"
                aria-labelledby={captionId}
                className="flex flex-col gap-1"
            >
                {options.map((option) => {
                    const isChecked = value.includes(option.id);

                    return (
                        <label
                            key={option.id}
                            className="flex h-9 cursor-pointer items-center gap-3 rounded-sm px-1 hover:bg-active/60 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent"
                        >
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => onToggle(option.id)}
                                className="sr-only"
                            />
                            <span
                                aria-hidden="true"
                                className={cn(
                                    'font-mono text-sm',
                                    isChecked ? 'text-success' : 'text-faint',
                                )}
                            >
                                {isChecked ? '[x]' : '[ ]'}
                            </span>
                            <span
                                className={cn(
                                    'text-sm',
                                    isChecked
                                        ? 'text-muted line-through'
                                        : 'text-text',
                                )}
                            >
                                {t(option.label)}
                            </span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
}
