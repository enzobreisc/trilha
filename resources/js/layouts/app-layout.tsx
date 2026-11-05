import { router, usePage } from '@inertiajs/react';
import { useCallback, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { OverlayHost } from '@/components/overlays/overlay-host';
import { AppStatusBar } from '@/components/ui/app-status-bar';
import { AppTopBar } from '@/components/ui/app-top-bar';
import { KeyHint, KeyHintBar } from '@/components/ui/key-hint';
import { useGlobalHotkeys } from '@/hooks/use-global-hotkeys';
import { useTranslation } from '@/hooks/use-translation';
import type { TranslationKey } from '@/lib/i18n';
import { sampleAppChrome } from '@/lib/sample-data';
import type { OverlayName } from '@/types/overlay';

const FOCUSED_PATHS = ['/welcome', '/start', '/import'];

const GLOBAL_SHORTCUT_HINTS: { keys: string; label: TranslationKey }[] = [
    { keys: '⌘K', label: 'buscar tópico ou ação' },
    { keys: '?', label: 'esta ajuda' },
    { keys: '1–4', label: 'ir para uma seção' },
    { keys: 'esc', label: 'voltar ou fechar' },
];

export default function AppLayout({ children }: { children: ReactNode }) {
    const { t } = useTranslation();
    const { url } = usePage();
    const pathname = url.split(/[?#]/)[0];
    const isFocusedScreen = FOCUSED_PATHS.includes(pathname);
    const [openOverlay, setOpenOverlay] = useState<OverlayName | null>(null);
    const closeOverlay = useCallback(() => setOpenOverlay(null), []);
    const currentRoadmap = sampleAppChrome.roadmaps.find(
        (roadmap) => roadmap.id === sampleAppChrome.currentRoadmapId,
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
                    chrome={sampleAppChrome}
                    onOpenOverlay={setOpenOverlay}
                />
            )}
            <main className="flex min-h-0 flex-1 flex-col gap-7 overflow-y-auto px-7 pt-5 pb-8">
                {children}
            </main>
            {!isFocusedScreen && (
                <>
                    <KeyHintBar label={t('Atalhos de teclado')}>
                        {GLOBAL_SHORTCUT_HINTS.map((hint) => (
                            <KeyHint
                                key={hint.keys}
                                keys={hint.keys}
                                label={t(hint.label)}
                            />
                        ))}
                    </KeyHintBar>
                    <AppStatusBar
                        roadmap={currentRoadmap}
                        reviewsDue={sampleAppChrome.reviewsDue}
                    />
                </>
            )}
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
