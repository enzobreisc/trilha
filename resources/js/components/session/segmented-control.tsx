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
            className="flex flex-wrap gap-2 self-start"
        >
            {options.map((option) => {
                const isSelected = option.value === value;

                return (
                    <label
                        key={option.value}
                        className={cn(
                            'inline-flex h-8 cursor-pointer items-center rounded-sm border px-3.5 font-mono text-[13px] has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent',
                            isSelected
                                ? 'border-accent bg-primary/25 text-accent'
                                : 'border-leader text-text hover:bg-active',
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
