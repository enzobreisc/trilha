import { useEffect, useRef, type RefObject } from 'react';

export function useModalDialog(initialFocusRef: RefObject<HTMLElement | null>) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog || dialog.open) {
            return;
        }
        dialog.showModal();
        initialFocusRef.current?.focus();
    }, [initialFocusRef]);

    return dialogRef;
}
