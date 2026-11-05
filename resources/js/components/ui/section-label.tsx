import type { ReactNode } from 'react';

export function SectionLabel({
    children,
    aside,
}: {
    children: ReactNode;
    aside?: ReactNode;
}) {
    return (
        <div className="flex items-baseline justify-between gap-3">
            <h2 className="font-mono text-[11px] tracking-[0.08em] text-muted uppercase">
                {children}
            </h2>
            {aside && (
                <span className="font-mono text-[11px] text-muted">
                    {aside}
                </span>
            )}
        </div>
    );
}
