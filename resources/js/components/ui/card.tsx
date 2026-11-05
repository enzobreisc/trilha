import type { ReactNode } from 'react';
import { SectionLabel } from '@/components/ui/section-label';
import { cn } from '@/lib/utils';

export function Card({
    title,
    aside,
    className,
    children,
}: {
    title?: string;
    aside?: ReactNode;
    className?: string;
    children: ReactNode;
}) {
    return (
        <section
            className={cn(
                'flex min-w-0 flex-col gap-4 rounded-sm bg-surface p-5 inset-ring inset-ring-border',
                className,
            )}
        >
            {(title || aside) && (
                <SectionLabel aside={aside}>{title}</SectionLabel>
            )}
            {children}
        </section>
    );
}
