import type { ComponentProps } from 'react';

export function CheckIcon(props: ComponentProps<'svg'>) {
    return (
        <svg
            width={14}
            height={14}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        >
            <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
    );
}

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
