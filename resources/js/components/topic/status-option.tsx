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
                'inline-flex h-11 cursor-pointer items-center gap-2.5 rounded-full px-4 text-sm font-semibold transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent',
                isChecked
                    ? 'bg-active text-text inset-ring inset-ring-strong'
                    : 'bg-elevated text-muted inset-ring inset-ring-border hover:text-secondary',
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
            <span aria-hidden="true" className="flex">
                <StatusIcon status={status} />
            </span>
            {label}
        </label>
    );
}
