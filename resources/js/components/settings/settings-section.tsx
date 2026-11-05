import type { ReactNode } from 'react';
import { SectionLabel } from '@/components/ui/section-label';

export function SettingsSection({
    title,
    index,
    children,
}: {
    title: string;
    index: number;
    children: ReactNode;
}) {
    return (
        <section className="flex flex-col gap-2.5 border-t border-border pt-3.5 first:border-t-0 first:pt-0">
            <SectionLabel aside={index}>{title}</SectionLabel>
            {children}
        </section>
    );
}
