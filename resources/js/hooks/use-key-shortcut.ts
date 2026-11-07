import { useEffect } from 'react';
import { hasCommandModifier, isModalOpen, isTypingTarget } from '@/lib/dom';

export function useKeyShortcut(
    key: string,
    handler: () => void,
    isEnabled = true,
): void {
    useEffect(() => {
        if (!isEnabled) {
            return;
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (
                event.key !== key ||
                hasCommandModifier(event) ||
                isTypingTarget(event.target) ||
                isModalOpen()
            ) {
                return;
            }
            event.preventDefault();
            handler();
        }

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [key, handler, isEnabled]);
}
