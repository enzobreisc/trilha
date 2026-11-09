import { StatusIcon } from '@/components/status-icon';
import { cn } from '@/lib/utils';
import type { TopicStatus } from '@/types/topic';

export function StatusOption({
    status,
    label,
    description,
    isChecked,
    onSelect,
}: {
    status: TopicStatus;
    label: string;
    description: string;
    isChecked: boolean;
    onSelect: () => void;
}) {
    return (
        <label
            className={cn(
                'flex cursor-pointer gap-2.5 rounded-sm border px-3 py-2 font-mono text-[13px] transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent',
                isChecked
                    ? 'border-accent bg-accent/10 text-accent'
                    : 'border-border text-muted hover:text-secondary',
            )}
        >
            <input
                type="radio"
                name="topic-status"
                value={status}
                checked={isChecked}
                onChange={onSelect}
                className="sr-only"
            />
            <span aria-hidden="true">{isChecked ? '(•)' : '( )'}</span>
            <span className="flex min-w-0 flex-col gap-0.5">
                <span
                    className={cn(
                        'flex items-center gap-2.5',
                        isChecked && 'font-bold',
                    )}
                >
                    <span aria-hidden="true" className="flex">
                        <StatusIcon status={status} />
                    </span>
                    {label}
                </span>
                <span className="font-sans text-xs leading-[18px] font-normal text-muted">
                    {description}
                </span>
            </span>
        </label>
    );
}
