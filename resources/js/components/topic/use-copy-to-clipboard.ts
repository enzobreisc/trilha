import { useState } from 'react';

export function useCopyToClipboard() {
    const [copied, setCopied] = useState(false);

    async function copy(text: string) {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
        } catch {
            setCopied(false);
        }
    }

    return { copied, copy };
}
