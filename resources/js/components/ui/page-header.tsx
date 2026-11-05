import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { SectionLabel } from '@/components/ui/section-label';

export function PageHeader({
    title,
    description,
    actions,
}: {
    title: string;
    description?: string;
    actions?: ReactNode;
}) {
    return (
        <>
            <Head title={title} />
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="flex flex-col gap-1.5">
                    <h1 className="font-display text-[34px] leading-[42px] font-semibold tracking-[-0.03em]">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-sm text-secondary">{description}</p>
                    )}
                </div>
                {actions}
            </div>
        </>
    );
}

export function SectionTitle({ children }: { children: string }) {
    return <SectionLabel>{children}</SectionLabel>;
}
