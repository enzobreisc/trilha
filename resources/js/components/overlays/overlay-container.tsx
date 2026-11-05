import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

export function OverlayContainer({
    role,
    label,
    className,
    onClose,
    children,
}: {
    role: 'dialog' | 'menu';
    label: string;
    className: string;
    onClose: () => void;
    children: ReactNode;
}) {
    const { t } = useTranslation();
    const panelRef = useRef<HTMLDivElement>(null);
    const [opener] = useState(() => document.activeElement);

    useEffect(() => {
        const panel = panelRef.current;
        const focusTarget = panel?.querySelector<HTMLElement>('input') ?? panel;
        focusTarget?.focus();

        return () => {
            if (opener instanceof HTMLElement) {
                opener.focus();
            }
        };
    }, [opener]);

    return (
        <>
            <button
                type="button"
                tabIndex={-1}
                aria-label={t('Fechar')}
                onClick={onClose}
                className="fixed inset-0 z-40 cursor-default bg-black/60 app-no-drag"
            />
            <div
                ref={panelRef}
                role={role}
                aria-label={label}
                tabIndex={-1}
                className={cn(
                    'fixed z-50 box-border flex flex-col overflow-hidden rounded-lg bg-bg shadow-float outline-none app-no-drag',
                    className,
                )}
            >
                {children}
            </div>
        </>
    );
}
