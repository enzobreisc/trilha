import type { ReactNode } from 'react';
import { SectionLabel } from '@/components/ui/section-label';

export function TopicSection({
    title,
    aside,
    children,
}: {
    title: string;
    aside?: ReactNode;
    children: ReactNode;
}) {
    return (
        <section className="flex min-w-0 flex-col gap-2.5 border-t border-border pt-3.5 first:border-t-0 first:pt-0">
            <SectionLabel aside={aside}>{title}</SectionLabel>
            {children}
        </section>
    );
}
