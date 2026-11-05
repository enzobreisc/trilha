import { Link } from '@inertiajs/react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

const BASE_CLASSES =
    'inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold whitespace-nowrap transition-colors';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
    primary: 'bg-text text-bg hover:bg-secondary',
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
