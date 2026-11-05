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

export function CheckIcon(props: ComponentProps<'svg'>) {
    return (
        <Icon {...props}>
            <path d="M5 12.5l4.5 4.5L19 7.5" />
        </Icon>
    );
}

export function GridIcon(props: ComponentProps<'svg'>) {
    return (
        <Icon {...props}>
            <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
            <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
            <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
            <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
        </Icon>
    );
}

export function GlobeIcon(props: ComponentProps<'svg'>) {
    return (
        <Icon {...props}>
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
        </Icon>
    );
}

export function KeyboardIcon(props: ComponentProps<'svg'>) {
    return (
        <Icon {...props}>
            <rect x="2.5" y="6" width="19" height="12" rx="2.5" />
            <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10" />
        </Icon>
    );
}

export function BoltIcon(props: ComponentProps<'svg'>) {
    return (
        <Icon {...props}>
            <path d="M13 3L5 13.5h6L10 21l8-10.5h-6z" />
        </Icon>
    );
}
