const MODAL_SELECTOR = 'dialog[open], [data-overlay]';

export function isModalOpen(): boolean {
    return document.querySelector(MODAL_SELECTOR) !== null;
}

export function isTypingTarget(target: EventTarget | null): boolean {
    if (!(target instanceof HTMLElement)) {
        return false;
    }

    return (
        target.isContentEditable ||
        ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)
    );
}

export function hasCommandModifier(event: KeyboardEvent): boolean {
    return event.metaKey || event.ctrlKey || event.altKey;
}
