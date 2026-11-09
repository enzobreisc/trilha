import { router, usePage } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { OverlayHost } from '@/components/overlays/overlay-host';
import { SessionDialogProvider } from '@/components/session/session-dialog-provider';
import { AppStatusBar } from '@/components/ui/app-status-bar';
import { AppTopBar } from '@/components/ui/app-top-bar';
import { KeyHint, KeyHintBar } from '@/components/ui/key-hint';
import { useChrome } from '@/hooks/use-chrome';
import { useGlobalHotkeys } from '@/hooks/use-global-hotkeys';
import { useTranslation } from '@/hooks/use-translation';
import { GLOBAL_SHORTCUTS } from '@/lib/shortcuts';
import type { OverlayName } from '@/types/overlay';

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <SessionDialogProvider>
            <AppFrame>{children}</AppFrame>
        </SessionDialogProvider>
    );
}

function AppFrame({ children }: { children: ReactNode }) {
    const { t } = useTranslation();
    const { url } = usePage();
    const chrome = useChrome();
    const pathname = url.split(/[?#]/)[0];
    const isFocusedScreen = chrome.roadmaps.length === 0;
    const [openOverlay, setOpenOverlay] = useState<OverlayName | null>(null);
    const closeOverlay = useCallback(() => setOpenOverlay(null), []);
    const currentRoadmap = chrome.roadmaps.find(
        (roadmap) => roadmap.id === chrome.currentRoadmapId,
    );

    useEffect(() => router.on('navigate', closeOverlay), [closeOverlay]);
    useGlobalHotkeys({
        openOverlay,
        isNavigationVisible: !isFocusedScreen,
        onOpenOverlay: setOpenOverlay,
        onCloseOverlay: closeOverlay,
    });

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-bg text-text">
            {isFocusedScreen ? (
                <div className="h-9 shrink-0 app-drag" />
            ) : (
                <AppTopBar
                    pathname={pathname}
                    chrome={chrome}
                    onOpenOverlay={setOpenOverlay}
                />
            )}
            <main className="flex min-h-0 flex-1 flex-col gap-7 overflow-y-auto px-7 pt-5 pb-8">
                {children}
            </main>
            {!isFocusedScreen && (
                <>
                    <KeyHintBar label={t('Atalhos de teclado')}>
                        {GLOBAL_SHORTCUTS.map((hint) => (
                            <KeyHint
                                key={hint.keys}
                                keys={hint.keys}
                                label={t(hint.label)}
                            />
                        ))}
                    </KeyHintBar>
                    {currentRoadmap && (
                        <AppStatusBar roadmap={currentRoadmap} />
                    )}
                </>
            )}
            {openOverlay !== null && (
                <OverlayHost
                    overlay={openOverlay}
                    chrome={chrome}
                    onClose={closeOverlay}
                    onOpenOverlay={setOpenOverlay}
                />
            )}
        </div>
    );
}
