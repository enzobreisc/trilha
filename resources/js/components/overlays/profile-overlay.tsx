import { router, usePage } from '@inertiajs/react';
import { OverlayContainer } from '@/components/overlays/overlay-container';
import {
    OverlayMenuCaption,
    OverlayMenuDivider,
    OverlayMenuRow,
} from '@/components/overlays/overlay-menu-row';
import { useTranslation } from '@/hooks/use-translation';
import type { Locale, TranslationKey } from '@/lib/i18n';
import type { OverlayProps } from '@/types/overlay';

const LANGUAGE_OPTIONS: { locale: Locale; label: TranslationKey }[] = [
    { locale: 'pt_BR', label: 'português (Brasil)' },
    { locale: 'en', label: 'English' },
];

const CURRENT_LANGUAGE_MARKER = '✓';
const SHORTCUTS_HINT = '?';

export function ProfileOverlay({
    chrome,
    onClose,
    onOpenOverlay,
}: OverlayProps) {
    const { t } = useTranslation();
    const { locale } = usePage().props;

    return (
        <OverlayContainer
            role="menu"
            label={t('Menu do perfil')}
            onClose={onClose}
            className="top-11.5 right-4 w-75"
        >
            <div className="flex flex-col gap-0.5 border-b border-border px-4 pt-3.5 pb-3">
                <p className="text-sm font-semibold text-text">
                    {chrome.profileName}
                </p>
                <p className="font-mono text-[11px] text-muted">
                    {t('dados neste computador')}
                </p>
            </div>
            <div className="flex flex-col gap-0.5 p-2">
                <OverlayMenuCaption>{t('idioma')}</OverlayMenuCaption>
                {LANGUAGE_OPTIONS.map((option) => {
                    const isCurrent = option.locale === locale;

                    return (
                        <OverlayMenuRow
                            key={option.locale}
                            role="menuitemradio"
                            label={t(option.label)}
                            marker={
                                isCurrent ? CURRENT_LANGUAGE_MARKER : undefined
                            }
                            isCurrent={isCurrent}
                            onSelect={() =>
                                router.put('/locale', { locale: option.locale })
                            }
                        />
                    );
                })}
                <OverlayMenuDivider />
                <OverlayMenuRow href="/sessions" label={t('Sessões')} />
                <OverlayMenuRow
                    href="/settings"
                    label={t('Ajustes e backup')}
                />
                <OverlayMenuRow
                    label={t('Atalhos de teclado')}
                    detail={SHORTCUTS_HINT}
                    onSelect={() => onOpenOverlay('shortcuts')}
                />
            </div>
        </OverlayContainer>
    );
}
