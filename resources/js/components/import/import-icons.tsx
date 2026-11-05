import type { ComponentProps } from 'react';

function ImportIcon(props: ComponentProps<'svg'>) {
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

export function CheckCircleIcon(props: ComponentProps<'svg'>) {
    return (
        <ImportIcon {...props}>
            <circle cx="12" cy="12" r="9" />
            <path d="M8.5 12.5l2.5 2.5 4.5-5" />
        </ImportIcon>
    );
}

export function WarningIcon(props: ComponentProps<'svg'>) {
    return (
        <ImportIcon {...props}>
            <path d="M10.3 4.9L2.6 18a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 4.9a2 2 0 0 0-3.4 0z" />
            <path d="M12 9.5v4M12 17h.01" />
        </ImportIcon>
    );
}

export function ErrorIcon(props: ComponentProps<'svg'>) {
    return (
        <ImportIcon {...props}>
            <circle cx="12" cy="12" r="9" />
            <path d="M9 9l6 6M15 9l-6 6" />
        </ImportIcon>
    );
}

export function UploadIcon(props: ComponentProps<'svg'>) {
    return (
        <ImportIcon {...props}>
            <path d="M12 15V4M7 9l5-5 5 5" />
            <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
        </ImportIcon>
    );
}
