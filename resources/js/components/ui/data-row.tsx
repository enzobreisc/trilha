import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function DataRow({
    label,
    value,
    className,
}: {
    label: ReactNode;
    value: ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                'flex items-baseline gap-2 font-mono text-xs',
                className,
            )}
        >
            <span className="text-secondary">{label}</span>
            <span
                aria-hidden="true"
                className="min-w-3 flex-1 -translate-y-0.75 border-b border-dotted border-leader"
            />
            <span className="text-text">{value}</span>
        </div>
    );
}
