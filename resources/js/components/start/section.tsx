import type { ReactNode } from 'react';
import { SectionLabel } from '@/components/ui/section-label';
import { cn } from '@/lib/utils';

export function Section({
    title,
    aside,
    className,
    children,
}: {
    title: string;
    aside?: ReactNode;
    className?: string;
    children: ReactNode;
}) {
    return (
        <section
            className={cn(
                'flex min-w-0 flex-col gap-3 border-t border-border pt-5 first:border-t-0 first:pt-0',
                className,
            )}
        >
            <SectionLabel aside={aside}>{title}</SectionLabel>
            {children}
        </section>
    );
}
