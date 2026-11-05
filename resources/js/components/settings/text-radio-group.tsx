import { useId } from 'react';
import { cn } from '@/lib/utils';

export type RadioOption<T extends string> = {
    value: T;
    label: string;
};

export function TextRadioGroup<T extends string>({
    label,
    options,
    value,
    onChange,
}: {
    label: string;
    options: RadioOption<T>[];
    value: T;
    onChange: (value: T) => void;
}) {
    const groupName = useId();

    return (
        <div
            role="radiogroup"
            aria-label={label}
            className="flex flex-wrap gap-x-4.5 gap-y-1.5 font-mono text-[13px]"
        >
            {options.map((option) => {
                const isSelected = option.value === value;

                return (
                    <label
                        key={option.value}
                        className={cn(
                            'inline-flex cursor-pointer items-center gap-2 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent',
                            isSelected
                                ? 'font-bold text-text'
                                : 'text-muted hover:text-secondary',
                        )}
                    >
                        <input
                            type="radio"
                            name={groupName}
                            value={option.value}
                            checked={isSelected}
                            onChange={() => onChange(option.value)}
                            className="sr-only"
                        />
                        <span aria-hidden="true">
                            {isSelected ? '(•)' : '( )'}
                        </span>
                        {option.label}
                    </label>
                );
            })}
        </div>
    );
}
