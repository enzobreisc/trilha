import { router, usePage } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { OverlayHost } from '@/components/overlays/overlay-host';
import { AppSidebar } from '@/components/ui/app-sidebar';
import { useGlobalHotkeys } from '@/hooks/use-global-hotkeys';
import { sampleAppChrome } from '@/lib/sample-data';
import type { OverlayName } from '@/types/overlay';

const FOCUSED_PATHS = ['/welcome', '/start'];

export default function AppLayout({ children }: { children: ReactNode }) {
    const { url } = usePage();
    const pathname = url.split(/[?#]/)[0];
    const isFocusedScreen = FOCUSED_PATHS.includes(pathname);
    const [openOverlay, setOpenOverlay] = useState<OverlayName | null>(null);
    const closeOverlay = useCallback(() => setOpenOverlay(null), []);

    useEffect(() => router.on('navigate', closeOverlay), [closeOverlay]);
    useGlobalHotkeys({
        openOverlay,
        isNavigationVisible: !isFocusedScreen,
        onOpenOverlay: setOpenOverlay,
        onCloseOverlay: closeOverlay,
    });

    return (
        <div className="flex h-screen overflow-hidden bg-bg text-text">
            {!isFocusedScreen && (
                <AppSidebar
                    pathname={pathname}
                    chrome={sampleAppChrome}
                    onOpenOverlay={setOpenOverlay}
                />
            )}
            <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
                <div className="sticky top-0 z-10 h-9 shrink-0 bg-bg app-drag" />
                <main className="flex flex-1 flex-col gap-7 px-10 pt-2 pb-10">
                    {children}
                </main>
            </div>
            {openOverlay !== null && (
                <OverlayHost
                    overlay={openOverlay}
                    chrome={sampleAppChrome}
                    onClose={closeOverlay}
                    onOpenOverlay={setOpenOverlay}
                />
            )}
        </div>
    );
}
