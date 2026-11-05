import type { ComponentProps } from 'react';

export function CloseIcon(props: ComponentProps<'svg'>) {
    return (
        <svg
            width={16}
            height={16}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.9}
            strokeLinecap="round"
            aria-hidden="true"
            {...props}
        >
            <path d="M6 6l12 12M18 6L6 18" />
        </svg>
    );
}
