import { Link } from '@inertiajs/react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const BASE_CLASSES =
    'inline-flex h-9 shrink-0 items-center justify-center gap-2.5 rounded-sm px-4 text-[13px] font-semibold whitespace-nowrap transition-colors';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
    primary: 'bg-accent text-bg hover:bg-accent/90',
    secondary:
        'bg-elevated text-text inset-ring inset-ring-strong hover:bg-active',
    ghost: 'text-secondary hover:bg-active hover:text-text',
};

type ButtonStyleProps = {
    variant?: ButtonVariant;
    className?: string;
    children: ReactNode;
};

export function ButtonLink({
    href,
    variant = 'primary',
    className,
    children,
}: ButtonStyleProps & { href: string }) {
    return (
        <Link
            href={href}
            className={cn(BASE_CLASSES, VARIANT_CLASSES[variant], className)}
        >
            {children}
        </Link>
    );
}

export function Button({
    variant = 'primary',
    className,
    children,
    ...buttonProps
}: ButtonStyleProps &
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'>) {
    return (
        <button
            type="button"
            className={cn(BASE_CLASSES, VARIANT_CLASSES[variant], className)}
            {...buttonProps}
        >
            {children}
        </button>
    );
}
