import { OverlayContainer } from '@/components/overlays/overlay-container';
import { OverlayKbd } from '@/components/overlays/overlay-kbd';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import type { TranslationKey } from '@/lib/i18n';

type ShortcutSpec = { keys: string; label: TranslationKey };
type ShortcutGroup = { title: TranslationKey; shortcuts: ShortcutSpec[] };

const SHORTCUT_GROUPS: ShortcutGroup[] = [
    {
        title: 'global',
        shortcuts: [
            { keys: '⌘K', label: 'buscar tópico ou ação' },
            { keys: '?', label: 'esta ajuda' },
            { keys: 'esc', label: 'voltar ou fechar' },
            { keys: '1–4', label: 'ir para uma seção' },
        ],
    },
    {
        title: 'listas',
        shortcuts: [
            { keys: '↑ ↓', label: 'escolher' },
            { keys: '↵', label: 'abrir' },
            { keys: '→ ←', label: 'abrir e fechar seção' },
            { keys: 'f', label: 'filtrar' },
            { keys: '/', label: 'buscar na lista' },
        ],
    },
    {
        title: 'estudar',
        shortcuts: [
            { keys: 's', label: 'registrar sessão' },
            { keys: '␣', label: 'marcar item do checklist' },
            { keys: 'c', label: 'copiar o prompt' },
            { keys: 'y n', label: 'responder revisão' },
            { keys: 'l', label: 'lembrei bem' },
            { keys: 'p', label: 'preciso rever' },
        ],
    },
    {
        title: 'roadmaps',
        shortcuts: [
            { keys: 'a', label: 'adicionar roadmap' },
            { keys: 'o', label: 'escolher arquivo' },
            { keys: 'e', label: 'editar sessão' },
            { keys: '⌫', label: 'excluir sessão' },
            { keys: 'u', label: 'desfazer' },
        ],
    },
];

export function ShortcutsOverlay({ onClose }: { onClose: () => void }) {
    const { t } = useTranslation();

    return (
        <OverlayContainer
            role="dialog"
            label={t('Atalhos de teclado')}
            onClose={onClose}
            className="top-1/2 left-1/2 w-[calc(100%-2rem)] max-w-200 -translate-x-1/2 -translate-y-1/2"
        >
            <header className="px-6 pt-6 pb-2">
                <h2 className="font-display text-xl font-bold tracking-tight text-text">
                    {t('Atalhos de teclado')}
                </h2>
            </header>
            <div className="grid grid-cols-1 gap-x-10 gap-y-7 px-6 pt-4 pb-6 sm:grid-cols-2">
                {SHORTCUT_GROUPS.map((group) => (
                    <ShortcutGroupList key={group.title} group={group} />
                ))}
            </div>
            <footer className="flex justify-end border-t border-border px-6 py-4">
                <Button variant="secondary" onClick={onClose}>
                    {t('Fechar')}
                </Button>
            </footer>
        </OverlayContainer>
    );
}

function ShortcutGroupList({ group }: { group: ShortcutGroup }) {
    const { t } = useTranslation();

    return (
        <section className="flex flex-col gap-2.5">
            <h3 className="text-xs font-extrabold tracking-widest text-muted uppercase">
                {t(group.title)}
            </h3>
            <ul className="flex flex-col gap-2">
                {group.shortcuts.map((shortcut) => (
                    <li
                        key={shortcut.label}
                        className="flex items-center gap-3 text-sm font-medium"
                    >
                        <span className="flex w-20 shrink-0">
                            <OverlayKbd>{shortcut.keys}</OverlayKbd>
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
