import type { ReactNode } from 'react';
import { Kbd } from '@/components/ui/kbd';

export function OverlayKbd({ children }: { children: ReactNode }) {
    return (
        <span className="inline-flex shrink-0 items-center rounded-full bg-active px-2 py-0.5">
            <Kbd>{children}</Kbd>
        </span>
    );
}
