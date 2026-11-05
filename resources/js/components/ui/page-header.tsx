import { Head } from '@inertiajs/react';
import type { ReactNode } from 'react';

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
                    <h1 className="font-display text-[40px] leading-none font-bold tracking-tighter">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-[15px] font-medium text-muted">
                            {description}
                        </p>
                    )}
                </div>
                {actions}
            </div>
        </>
    );
}

export function SectionTitle({ children }: { children: string }) {
    return (
        <h2 className="text-xs font-extrabold tracking-widest text-muted uppercase">
            {children}
        </h2>
    );
}
