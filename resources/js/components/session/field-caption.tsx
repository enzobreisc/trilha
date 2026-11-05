import type { ReactNode } from 'react';

export const FIELD_CAPTION_CLASSES =
    'font-mono text-[11px] font-medium tracking-[0.08em] text-muted uppercase';

export function FieldCaption({
    id,
    children,
}: {
    id?: string;
    children: ReactNode;
}) {
    return (
        <span id={id} className={FIELD_CAPTION_CLASSES}>
            {children}
        </span>
    );
}
