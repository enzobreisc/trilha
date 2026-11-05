import { useId } from 'react';
import { cn } from '@/lib/utils';

type FilterOption<T extends string> = {
    value: T;
    label: string;
};

export function SessionFilterGroup<T extends string>({
    label,
    options,
    value,
    onChange,
}: {
    label: string;
    options: FilterOption<T>[];
    value: T;
    onChange: (value: T) => void;
}) {
    const groupName = useId();

    return (
        <div
            role="radiogroup"
            aria-label={label}
            className="flex flex-wrap items-baseline gap-x-5 gap-y-2 font-mono text-xs"
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
                                : 'text-muted hover:text-text',
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
