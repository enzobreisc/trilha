import { router } from '@inertiajs/react';
import { useEffect } from 'react';
import type { OverlayName } from '@/types/overlay';

type GlobalHotkeysOptions = {
    openOverlay: OverlayName | null;
    isNavigationVisible: boolean;
    onOpenOverlay: (overlay: OverlayName) => void;
    onCloseOverlay: () => void;
};

const TYPING_TAGS = ['INPUT', 'TEXTAREA', 'SELECT'];

const NUMBERED_DESTINATIONS = ['/', '/roadmap', '/reviews', '/sessions'];

function isTypingTarget(target: EventTarget | null): boolean {
    if (!(target instanceof HTMLElement)) {
        return false;
    }

    return target.isContentEditable || TYPING_TAGS.includes(target.tagName);
}

function isSearchShortcut(event: KeyboardEvent): boolean {
    return (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
}

function hasCommandModifier(event: KeyboardEvent): boolean {
    return event.metaKey || event.ctrlKey || event.altKey;
}

export function useGlobalHotkeys({
    openOverlay,
    isNavigationVisible,
    onOpenOverlay,
    onCloseOverlay,
}: GlobalHotkeysOptions): void {
    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                if (openOverlay !== null) {
                    onCloseOverlay();
                }
                return;
            }

            if (isSearchShortcut(event)) {
                if (isNavigationVisible) {
                    event.preventDefault();
                    onOpenOverlay('search');
                }
                return;
            }

            if (
                openOverlay !== null ||
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

            const destination = NUMBERED_DESTINATIONS.find(
                (_, index) => event.key === String(index + 1),
            );
            if (destination !== undefined) {
                router.visit(destination);
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [openOverlay, isNavigationVisible, onOpenOverlay, onCloseOverlay]);
}
