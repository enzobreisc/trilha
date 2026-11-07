import { OverlayContainer } from '@/components/overlays/overlay-container';
import { OVERLAY_CAPTION_CLASSES } from '@/components/overlays/overlay-menu-row';
import { Kbd } from '@/components/ui/kbd';
import { SectionLabel } from '@/components/ui/section-label';
import { useTranslation } from '@/hooks/use-translation';
import { SHORTCUT_GROUPS, type ShortcutGroup } from '@/lib/shortcuts';

export function ShortcutsOverlay({ onClose }: { onClose: () => void }) {
    const { t } = useTranslation();

    return (
        <OverlayContainer
            role="dialog"
            label={t('Atalhos de teclado')}
            onClose={onClose}
            className="top-1/2 left-1/2 w-[calc(100%-2rem)] max-w-225 -translate-x-1/2 -translate-y-1/2"
        >
            <header className="flex items-center justify-between gap-3 border-b border-border bg-chrome px-5 py-3">
                <SectionLabel>{t('Atalhos de teclado')}</SectionLabel>
                <button
                    type="button"
                    onClick={onClose}
                    className="flex items-center gap-2 font-mono text-[11px] text-muted hover:text-text"
                >
                    <Kbd>esc</Kbd>
                    {t('fechar')}
                </button>
            </header>
            <div className="grid grid-cols-1 gap-x-9 gap-y-6 p-6 sm:grid-cols-2">
                {SHORTCUT_GROUPS.map((group) => (
                    <ShortcutGroupList key={group.title} group={group} />
                ))}
            </div>
        </OverlayContainer>
    );
}

function ShortcutGroupList({ group }: { group: ShortcutGroup }) {
    const { t } = useTranslation();

    return (
        <section className="flex flex-col gap-2">
            <h3 className={OVERLAY_CAPTION_CLASSES}>{t(group.title)}</h3>
            <ul className="flex flex-col gap-1">
                {group.shortcuts.map((shortcut) => (
                    <li
                        key={shortcut.label}
                        className="flex items-center gap-3 py-0.5 text-[13px]"
                    >
                        <span className="flex w-14 shrink-0">
                            <Kbd>{shortcut.keys}</Kbd>
                        </span>
                        <span className="text-secondary">
                            {t(shortcut.label)}
                        </span>
                    </li>
                ))}
            </ul>
        </section>
    );
}
