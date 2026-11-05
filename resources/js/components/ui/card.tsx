import type { ReactNode } from 'react';
import { SectionTitle } from '@/components/ui/page-header';
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
                'flex min-w-0 flex-col gap-4 rounded-md bg-surface p-6 inset-ring inset-ring-border',
                className,
            )}
        >
            {(title || aside) && (
                <header className="flex items-center justify-between gap-3">
                    {title && <SectionTitle>{title}</SectionTitle>}
                    {aside && (
                        <span className="text-xs font-semibold text-faint">
                            {aside}
                        </span>
                    )}
                </header>
            )}
            {children}
        </section>
    );
}
