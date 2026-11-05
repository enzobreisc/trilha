import { Link } from '@inertiajs/react';
import { Logo } from '@/components/logo';
import { ChevronDownIcon } from '@/components/ui/icons';
import { Kbd } from '@/components/ui/kbd';
import { useTranslation } from '@/hooks/use-translation';
import type { TranslationKey } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import type { AppChrome } from '@/types/app-chrome';
import type { OverlayName } from '@/types/overlay';

type NavigationItem = {
    label: TranslationKey;
    href: string;
    showsReviewCount?: boolean;
};

const MAIN_ITEMS: NavigationItem[] = [
    { label: 'Início', href: '/' },
    { label: 'Trilha', href: '/roadmap' },
    { label: 'Revisões', href: '/reviews', showsReviewCount: true },
    { label: 'Sessões', href: '/sessions' },
];

function isActivePath(pathname: string, href: string): boolean {
    if (href === '/') {
        return pathname === '/';
    }
    return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppTopBar({
    pathname,
    chrome,
    onOpenOverlay,
}: {
    pathname: string;
    chrome: AppChrome;
    onOpenOverlay: (overlay: OverlayName) => void;
}) {
    const { t } = useTranslation();
    const currentRoadmap = chrome.roadmaps.find(
        (roadmap) => roadmap.id === chrome.currentRoadmapId,
    );

    return (
        <header className="app-drag flex flex-wrap items-stretch border-b border-border bg-chrome">
            <div aria-hidden="true" className="w-19 shrink-0" />
            <Link
                href="/start"
                aria-label={t('trilha: escolher o que estudar')}
                className="app-no-drag flex items-center border-r border-border px-5"
            >
                <Logo />
            </Link>
            <nav aria-label={t('Seções')} className="flex">
                {MAIN_ITEMS.map((item) => (
                    <TopBarLink
                        key={item.href}
                        item={item}
                        isActive={isActivePath(pathname, item.href)}
                        count={
                            item.showsReviewCount ? chrome.reviewsDue : undefined
                        }
                    />
                ))}
            </nav>
            <div className="flex-1" />
            {currentRoadmap && (
                <button
                    type="button"
                    aria-haspopup="menu"
                    aria-label={t('Trocar de roadmap')}
                    onClick={() => onOpenOverlay('switcher')}
                    className="app-no-drag my-1.5 ml-2 flex h-8 items-center gap-2.5 rounded-sm border border-strong px-3 font-mono text-xs text-text hover:bg-active"
                >
                    <span className="text-accent">⎇</span>
                    <span className="max-w-56 truncate">
                        {currentRoadmap.name}
                    </span>
                    <ChevronDownIcon width={12} height={12} />
                </button>
            )}
            <button
                type="button"
                aria-label={t('Buscar tópico')}
                onClick={() => onOpenOverlay('search')}
                className="app-no-drag my-1.5 ml-2 flex h-8 items-center gap-3 rounded-sm border border-strong px-3 font-mono text-xs text-muted hover:bg-active hover:text-text"
            >
                <span>{t('buscar tópico')}</span>
                <Kbd>⌘K</Kbd>
            </button>
            <button
                type="button"
                aria-haspopup="menu"
                aria-label={t('Menu do perfil de :name', {
                    name: chrome.profileName,
                })}
                onClick={() => onOpenOverlay('profile')}
                className="app-no-drag m-1.5 mr-4 ml-2 flex size-8 items-center justify-center rounded-sm border border-strong font-mono text-xs font-bold text-accent hover:bg-active"
            >
                {chrome.profileName.charAt(0)}
            </button>
        </header>
    );
}

function TopBarLink({
    item,
    isActive,
    count,
}: {
    item: NavigationItem;
    isActive: boolean;
    count?: number;
}) {
    const { t } = useTranslation();

    return (
        <Link
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
                'app-no-drag flex h-10 items-center gap-2 border-t border-r border-border px-4.5 font-mono text-xs lowercase transition-colors',
                isActive
                    ? 'border-t-accent bg-bg text-text'
                    : 'border-t-transparent text-muted hover:text-text',
            )}
        >
            <span>{t(item.label)}</span>
            {count !== undefined && count > 0 && (
                <span className="text-review">◆{count}</span>
            )}
        </Link>
    );
}
