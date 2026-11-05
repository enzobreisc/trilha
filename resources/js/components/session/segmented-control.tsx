import { useId } from 'react';
import { cn } from '@/lib/utils';

export type SegmentedOption<T extends string | number> = {
    value: T;
    label: string;
};

export function SegmentedControl<T extends string | number>({
    label,
    options,
    value,
    onChange,
}: {
    label: string;
    options: SegmentedOption<T>[];
    value: T;
    onChange: (value: T) => void;
}) {
    const groupName = useId();

    return (
        <div
            role="radiogroup"
            aria-label={label}
            className="inline-flex flex-wrap gap-1 self-start rounded-full bg-surface p-1 inset-ring inset-ring-border"
        >
            {options.map((option) => {
                const isSelected = option.value === value;

                return (
                    <label
                        key={option.value}
                        className={cn(
                            'inline-flex h-8 cursor-pointer items-center rounded-full px-3.5 text-sm font-semibold has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent',
                            isSelected
                                ? 'bg-active text-white inset-ring inset-ring-strong'
                                : 'text-muted hover:text-text',
                        )}
                    >
                        <input
                            type="radio"
                            name={groupName}
                            value={String(option.value)}
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
