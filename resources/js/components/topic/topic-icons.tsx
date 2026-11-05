import type { ComponentProps } from 'react';

function Icon(props: ComponentProps<'svg'>) {
    return (
        <svg
            width={16}
            height={16}
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

export function CopyIcon(props: ComponentProps<'svg'>) {
    return (
        <Icon {...props}>
            <rect x="9" y="9" width="11" height="11" rx="2" />
            <path d="M5 15V6a2 2 0 0 1 2-2h9" />
        </Icon>
    );
}

export function CheckIcon(props: ComponentProps<'svg'>) {
    return (
        <Icon {...props}>
            <path d="M5 12.5l4.5 4.5L19 7.5" />
        </Icon>
    );
}

export function ExternalLinkIcon(props: ComponentProps<'svg'>) {
    return (
        <Icon {...props}>
            <path d="M14 4h6v6M20 4l-9 9" />
            <path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
        </Icon>
    );
}
