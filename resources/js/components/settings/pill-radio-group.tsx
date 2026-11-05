import { useId } from 'react';
import { cn } from '@/lib/utils';

export type RadioOption<T extends string> = {
    value: T;
    label: string;
};

export function PillRadioGroup<T extends string>({
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
            className="flex flex-wrap gap-2"
        >
            {options.map((option) => {
                const isSelected = option.value === value;

                return (
                    <label
                        key={option.value}
                        className={cn(
                            'inline-flex h-9 cursor-pointer items-center rounded-full px-4 text-sm font-semibold inset-ring has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent',
                            isSelected
                                ? 'bg-active text-white inset-ring-strong'
                                : 'text-muted inset-ring-border hover:bg-active/60 hover:text-text',
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
                        {option.label}
                    </label>
                );
            })}
        </div>
    );
}
