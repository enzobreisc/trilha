import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type OverlayMenuRowProps = {
    label: ReactNode;
    href?: string;
    onSelect?: () => void;
    marker?: ReactNode;
    detail?: ReactNode;
    isCurrent?: boolean;
    isHighlighted?: boolean;
    role?: 'menuitem' | 'menuitemradio';
};

const ROW_CLASSES =
    'flex min-h-8.5 w-full items-center gap-3 rounded-sm px-3 py-1.5 text-left text-[13px] font-medium transition-colors hover:bg-active hover:text-text';

export const OVERLAY_CAPTION_CLASSES =
    'font-mono text-[11px] tracking-[0.08em] text-muted uppercase';

export function OverlayMenuRow({
    label,
    href,
    onSelect,
    marker,
    detail,
    isCurrent = false,
    isHighlighted = false,
    role = 'menuitem',
}: OverlayMenuRowProps) {
    const className = cn(
        ROW_CLASSES,
        isHighlighted ? 'bg-primary/25 font-bold text-text' : 'text-secondary',
    );
    const content = (
        <>
            <span
                aria-hidden="true"
                className="flex w-3.5 shrink-0 justify-center font-mono text-accent"
            >
                {marker}
            </span>
            <span className="min-w-0 flex-1 truncate">{label}</span>
            {detail && (
                <span className="font-mono text-[11px] text-muted">
                    {detail}
                </span>
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
        <p className={cn('px-3 pt-2 pb-1', OVERLAY_CAPTION_CLASSES)}>
            {children}
        </p>
    );
}

export function OverlayMenuDivider() {
    return <div aria-hidden="true" className="my-1.5 border-t border-border" />;
}
