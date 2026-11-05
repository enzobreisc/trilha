import type { ComponentProps } from 'react';

function Icon(props: ComponentProps<'svg'>) {
    return (
        <svg
            width={18}
            height={18}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.9}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            {...props}
        />
    );
}

export function PendingIcon(props: ComponentProps<'svg'>) {
    return (
        <Icon {...props}>
            <circle cx="12" cy="12" r="8" />
        </Icon>
    );
}

export function CheckCircleIcon(props: ComponentProps<'svg'>) {
    return (
        <Icon {...props}>
            <circle cx="12" cy="12" r="9" />
            <path d="M8 12.5l2.7 2.7L16 9.5" />
        </Icon>
    );
}

export function CalendarIcon(props: ComponentProps<'svg'>) {
    return (
        <Icon {...props}>
            <rect x="4" y="5" width="16" height="15" rx="3" />
            <path d="M4 10h16M9 3v4M15 3v4" />
        </Icon>
    );
}
