import { createContext, useContext, useState, type ReactNode } from 'react';
import LogSessionDialog from '@/components/log-session-dialog';
import type { SessionToEdit } from '@/components/session/session-draft';

export type OpenSessionDialogOptions = {
    topicId?: string;
    session?: SessionToEdit;
};

const SessionDialogContext = createContext<
    (options?: OpenSessionDialogOptions) => void
>(() => undefined);

export function SessionDialogProvider({ children }: { children: ReactNode }) {
    const [options, setOptions] = useState<OpenSessionDialogOptions | null>(
        null,
    );

    return (
        <SessionDialogContext.Provider value={(next = {}) => setOptions(next)}>
            {children}
            {options && (
                <LogSessionDialog
                    defaultTopicId={options.topicId}
                    session={options.session}
                    onClose={() => setOptions(null)}
                />
            )}
        </SessionDialogContext.Provider>
    );
}

export function useSessionDialog() {
    return useContext(SessionDialogContext);
}
