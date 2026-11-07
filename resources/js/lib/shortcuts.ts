import type { TranslationKey } from '@/lib/i18n';

export type ShortcutSpec = { keys: string; label: TranslationKey };
export type ShortcutGroup = {
    title: TranslationKey;
    shortcuts: ShortcutSpec[];
};

export const SHORTCUT_GROUPS: ShortcutGroup[] = [
    {
        title: 'global',
        shortcuts: [
            { keys: '⌘K', label: 'buscar tópico ou ação' },
            { keys: '?', label: 'esta ajuda' },
            { keys: '1–4', label: 'ir para uma seção' },
            { keys: 'esc', label: 'voltar ou fechar' },
            { keys: 's', label: 'registrar sessão' },
            { keys: 'a', label: 'adicionar roadmap' },
        ],
    },
    {
        title: 'busca',
        shortcuts: [
            { keys: '↑ ↓', label: 'escolher' },
            { keys: '↵', label: 'abrir' },
        ],
    },
    {
        title: 'estudar',
        shortcuts: [
            { keys: '␣', label: 'marcar item do checklist' },
            { keys: 'c', label: 'copiar o prompt' },
        ],
    },
    {
        title: 'revisões',
        shortcuts: [
            { keys: 'y n', label: 'responder revisão' },
            { keys: 'l', label: 'lembrei bem' },
            { keys: 'p', label: 'preciso rever' },
        ],
    },
];

export const GLOBAL_SHORTCUTS = SHORTCUT_GROUPS[0].shortcuts;
