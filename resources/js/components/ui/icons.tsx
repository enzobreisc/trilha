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

export function HomeIcon(props: ComponentProps<'svg'>) {
    return (
        <Icon {...props}>
            <path d="M4 11l8-7 8 7v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" />
        </Icon>
    );
}

export function PathIcon(props: ComponentProps<'svg'>) {
    return (
        <Icon {...props}>
            <circle cx="6" cy="18" r="2.5" />
            <circle cx="18" cy="6" r="2.5" />
            <path d="M6 15.5V12a3 3 0 0 1 3-3h6a3 3 0 0 0 3-3" />
        </Icon>
    );
}

export function ReviewIcon(props: ComponentProps<'svg'>) {
    return (
        <Icon {...props}>
            <path d="M20 12a8 8 0 1 1-2.3-5.7" />
            <path d="M20 4v4h-4" />
        </Icon>
    );
}

export function ClockIcon(props: ComponentProps<'svg'>) {
    return (
        <Icon {...props}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
        </Icon>
    );
}

export function SettingsIcon(props: ComponentProps<'svg'>) {
    return (
        <Icon {...props}>
            <path d="M4 7h10M18 7h2M4 17h2M10 17h10" />
            <circle cx="16" cy="7" r="2" />
            <circle cx="8" cy="17" r="2" />
        </Icon>
    );
}

export function SearchIcon(props: ComponentProps<'svg'>) {
    return (
        <Icon {...props}>
            <circle cx="11" cy="11" r="6.5" />
            <path d="M16 16l4 4" />
        </Icon>
    );
}

export function PlusIcon(props: ComponentProps<'svg'>) {
    return (
        <Icon {...props}>
            <path d="M12 5v14M5 12h14" />
        </Icon>
    );
}

export function ChevronDownIcon(props: ComponentProps<'svg'>) {
    return (
        <Icon {...props}>
            <path d="M6 9l6 6 6-6" />
        </Icon>
    );
}
