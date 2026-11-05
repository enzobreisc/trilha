import type { ReactNode } from 'react';

export function Kbd({ children }: { children: ReactNode }) {
    return <kbd className="font-mono text-[11px] text-muted">{children}</kbd>;
}
