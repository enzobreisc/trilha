import type { ReactNode } from 'react';

export function Kbd({ children }: { children: ReactNode }) {
    return (
        <kbd className="inline-flex items-center rounded-xs border border-strong px-1.5 font-mono text-[11px] leading-4.5 text-text">
            {children}
        </kbd>
    );
}
