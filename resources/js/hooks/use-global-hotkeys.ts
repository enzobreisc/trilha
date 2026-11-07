import { router } from '@inertiajs/react';
import { useEffect } from 'react';
import { useSessionDialog } from '@/components/session/session-dialog-provider';
import { hasCommandModifier, isModalOpen, isTypingTarget } from '@/lib/dom';
import type { OverlayName } from '@/types/overlay';

type GlobalHotkeysOptions = {
    openOverlay: OverlayName | null;
    isNavigationVisible: boolean;
    onOpenOverlay: (overlay: OverlayName) => void;
    onCloseOverlay: () => void;
};

const NUMBERED_DESTINATIONS = [
    '/dashboard',
    '/roadmap',
    '/reviews',
    '/sessions',
];
const IMPORT_ROUTE = '/import';
const START_ROUTE = '/start';

function isSearchShortcut(event: KeyboardEvent): boolean {
    return (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
}

function goBack(): void {
    if (window.location.pathname === START_ROUTE) {
        return;
    }
    if (window.history.length > 1) {
        window.history.back();
        return;
    }
    router.visit(START_ROUTE);
}

export function useGlobalHotkeys({
    openOverlay,
    isNavigationVisible,
    onOpenOverlay,
    onCloseOverlay,
}: GlobalHotkeysOptions): void {
    const openSessionDialog = useSessionDialog();

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                if (openOverlay !== null) {
                    onCloseOverlay();
                    return;
                }
                if (!isModalOpen() && !isTypingTarget(event.target)) {
                    goBack();
                }
                return;
            }

            if (isSearchShortcut(event)) {
                if (isNavigationVisible && !isModalOpen()) {
                    event.preventDefault();
                    onOpenOverlay('search');
                }
                return;
            }

            if (
                openOverlay !== null ||
                isModalOpen() ||
                isTypingTarget(event.target) ||
                hasCommandModifier(event)
            ) {
                return;
            }

            if (event.key === '?') {
                onOpenOverlay('shortcuts');
                return;
            }

            if (!isNavigationVisible) {
                return;
            }

            if (event.key === 'a') {
                router.visit(IMPORT_ROUTE);
                return;
            }

            if (event.key === 's') {
                openSessionDialog();
                return;
            }

            const destination = NUMBERED_DESTINATIONS.find(
                (_, index) => event.key === String(index + 1),
            );
            if (destination !== undefined) {
                router.visit(destination);
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [
        openOverlay,
        isNavigationVisible,
        onOpenOverlay,
        onCloseOverlay,
        openSessionDialog,
    ]);
}
