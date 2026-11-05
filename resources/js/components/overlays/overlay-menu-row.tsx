import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { CheckIcon } from '@/components/overlays/overlay-icons';
import { cn } from '@/lib/utils';

type OverlayMenuRowProps = {
    label: ReactNode;
    href?: string;
    onSelect?: () => void;
    icon?: ReactNode;
    detail?: ReactNode;
    isCurrent?: boolean;
    role?: 'menuitem' | 'menuitemradio';
};

const ROW_CLASSES =
    'flex min-h-10 w-full items-center gap-3 rounded-sm px-3 text-left text-sm font-semibold transition-colors hover:bg-active hover:text-text';

export function OverlayMenuRow({
    label,
    href,
    onSelect,
    icon,
    detail,
    isCurrent = false,
    role = 'menuitem',
}: OverlayMenuRowProps) {
    const className = cn(
        ROW_CLASSES,
        isCurrent ? 'bg-active text-white' : 'text-secondary',
    );
    const content = (
        <>
            {icon && (
                <span aria-hidden="true" className="flex shrink-0 text-muted">
                    {icon}
                </span>
            )}
            <span className="min-w-0 flex-1 truncate">{label}</span>
            {detail && (
                <span className="font-mono text-xs font-normal text-faint">
                    {detail}
                </span>
            )}
            {isCurrent && (
                <CheckIcon
                    width={16}
                    height={16}
                    className="shrink-0 text-accent"
                />
            )}
        </>
    );
    const ariaChecked = role === 'menuitemradio' ? isCurrent : undefined;

    if (href !== undefined) {
        return (
            <Link
                href={href}
                role={role}
                aria-checked={ariaChecked}
                className={className}
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            type="button"
            role={role}
            aria-checked={ariaChecked}
            onClick={onSelect}
            className={className}
        >
            {content}
        </button>
    );
}

export function OverlayMenuCaption({ children }: { children: ReactNode }) {
    return (
        <p className="px-3 pt-2 pb-1 text-xs font-extrabold tracking-widest text-muted uppercase">
            {children}
        </p>
    );
}

export function OverlayMenuDivider() {
    return (
        <div
            aria-hidden="true"
            className="mx-2 my-1.5 border-t border-border"
        />
    );
}
