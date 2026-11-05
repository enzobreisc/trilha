import type { ComponentProps } from 'react';

export function EllipsisIcon(props: ComponentProps<'svg'>) {
    return (
        <svg
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            {...props}
        >
            <circle cx="5" cy="12" r="1.75" />
            <circle cx="12" cy="12" r="1.75" />
            <circle cx="19" cy="12" r="1.75" />
        </svg>
    );
}
