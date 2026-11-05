import { router, usePage } from '@inertiajs/react';
import { OverlayContainer } from '@/components/overlays/overlay-container';
import { KeyboardIcon } from '@/components/overlays/overlay-icons';
import {
    OverlayMenuCaption,
    OverlayMenuDivider,
    OverlayMenuRow,
} from '@/components/overlays/overlay-menu-row';
import { ClockIcon, SettingsIcon } from '@/components/ui/icons';
import { useTranslation } from '@/hooks/use-translation';
import type { Locale, TranslationKey } from '@/lib/i18n';
import type { OverlayProps } from '@/types/overlay';

const LANGUAGE_OPTIONS: { locale: Locale; label: TranslationKey }[] = [
    { locale: 'pt_BR', label: 'português (Brasil)' },
    { locale: 'en', label: 'English' },
];

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
            className="bottom-18 left-3.5 w-56"
        >
            <div className="flex items-center gap-3 px-4 pt-4 pb-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-active text-sm font-bold text-accent">
                    {chrome.profileName.charAt(0)}
                </span>
                <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-text">
                        {chrome.profileName}
                    </p>
                    <p className="text-xs font-medium text-faint">
                        {t('dados neste computador')}
                    </p>
                </div>
            </div>
            <OverlayMenuDivider />
            <div className="flex flex-col gap-0.5 p-2">
                <OverlayMenuCaption>{t('idioma')}</OverlayMenuCaption>
                {LANGUAGE_OPTIONS.map((option) => (
                    <OverlayMenuRow
                        key={option.locale}
                        role="menuitemradio"
                        label={t(option.label)}
                        isCurrent={option.locale === locale}
                        onSelect={() =>
                            router.put('/locale', { locale: option.locale })
                        }
                    />
                ))}
                <OverlayMenuDivider />
                <OverlayMenuRow
                    href="/sessions"
                    label={t('Sessões')}
                    icon={<ClockIcon />}
                />
                <OverlayMenuRow
                    href="/settings"
                    label={t('Ajustes e backup')}
                    icon={<SettingsIcon />}
                />
                <OverlayMenuRow
                    label={t('Atalhos de teclado')}
                    icon={<KeyboardIcon />}
                    onSelect={() => onOpenOverlay('shortcuts')}
                />
            </div>
        </OverlayContainer>
    );
}
