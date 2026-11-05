import type { ReactNode } from 'react';

export const FIELD_CAPTION_CLASSES = 'text-xs font-semibold text-muted';

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
