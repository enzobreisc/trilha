import type { ReactNode } from 'react';
import { Kbd } from '@/components/ui/kbd';

export function KeyHint({ keys, label }: { keys: string; label: ReactNode }) {
    return (
        <span className="inline-flex items-center gap-2 whitespace-nowrap">
            <Kbd>{keys}</Kbd>
            <span>{label}</span>
        </span>
    );
}

export function KeyHintBar({
    label,
    children,
}: {
    label: string;
    children: ReactNode;
}) {
    return (
        <div
            role="group"
            aria-label={label}
            className="flex min-h-8 flex-wrap items-center gap-x-5 gap-y-1.5 border-t border-border bg-chrome px-5 py-1.5 font-mono text-[11px] text-muted"
        >
            {children}
        </div>
    );
}
