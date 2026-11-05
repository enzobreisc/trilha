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
                'flex min-h-10 items-center justify-between gap-4 border-b border-border text-sm last:border-b-0',
                className,
            )}
        >
            <span className="font-medium text-secondary">{label}</span>
            <span className="font-semibold text-text">{value}</span>
        </div>
    );
}
