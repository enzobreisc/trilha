import type { ReactNode } from 'react';
import { SectionLabel } from '@/components/ui/section-label';

export function HomeStep({
    number,
    title,
    children,
}: {
    number: number;
    title: string;
    children: ReactNode;
}) {
    return (
        <section className="flex flex-col gap-4 rounded-sm border border-strong bg-surface p-5">
            <div className="flex items-baseline gap-3">
                <span
                    aria-hidden="true"
                    className="font-mono text-xs text-accent"
                >
                    {number}
                </span>
                <SectionLabel>{title}</SectionLabel>
            </div>
            {children}
        </section>
    );
}
