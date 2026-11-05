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

export function ChevronDownIcon(props: ComponentProps<'svg'>) {
    return (
        <Icon {...props}>
            <path d="M6 9l6 6 6-6" />
        </Icon>
    );
}
