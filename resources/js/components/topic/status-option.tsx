import { StatusIcon } from '@/components/status-icon';
import { cn } from '@/lib/utils';
import type { TopicStatus } from '@/types/topic';

export function StatusOption({
    status,
    label,
    isChecked,
    onSelect,
}: {
    status: TopicStatus;
    label: string;
    isChecked: boolean;
    onSelect: () => void;
}) {
    return (
        <label
            className={cn(
                'inline-flex cursor-pointer items-center gap-2.5 font-mono text-[13px] transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent',
                isChecked
                    ? 'font-bold text-accent'
                    : 'text-muted hover:text-secondary',
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
            <span aria-hidden="true" className="flex">
                <StatusIcon status={status} />
            </span>
            {label}
        </label>
    );
}
