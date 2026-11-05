import { Link } from '@inertiajs/react';
import type { ComponentType, SVGProps } from 'react';
import { Logo } from '@/components/logo';
import {
    ChevronDownIcon,
    ClockIcon,
    HomeIcon,
    PathIcon,
    PlusIcon,
    ReviewIcon,
    SearchIcon,
    SettingsIcon,
} from '@/components/ui/icons';
import { Kbd } from '@/components/ui/kbd';
import { useTranslation } from '@/hooks/use-translation';
import type { TranslationKey } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import type { AppChrome } from '@/types/app-chrome';
import type { OverlayName } from '@/types/overlay';

type NavigationItem = {
    label: TranslationKey;
    href: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    showsReviewCount?: boolean;
};

const MAIN_ITEMS: NavigationItem[] = [
    { label: 'Início', href: '/', icon: HomeIcon },
    { label: 'Trilha', href: '/roadmap', icon: PathIcon },
    {
        label: 'Revisões',
        href: '/reviews',
        icon: ReviewIcon,
        showsReviewCount: true,
    },
    { label: 'Sessões', href: '/sessions', icon: ClockIcon },
];

const SETTINGS_ITEM: NavigationItem = {
    label: 'Ajustes',
    href: '/settings',
    icon: SettingsIcon,
};

function isActivePath(pathname: string, href: string): boolean {
    if (href === '/') {
        return pathname === '/';
    }
    return pathname === href || pathname.startsWith(`${href}/`);
}

export function AppSidebar({
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
        <nav
            aria-label={t('Seções')}
            className="flex h-screen w-61 shrink-0 flex-col gap-0.5 overflow-y-auto border-r border-active/60 bg-sidebar px-3.5 pb-4"
        >
            <div className="h-9 shrink-0 app-drag" />
            <Link
                href="/start"
                aria-label={t('trilha: escolher o que estudar')}
                className="mb-4 rounded-sm pl-3"
            >
                <Logo />
            </Link>
            {currentRoadmap && (
                <button
                    type="button"
                    aria-haspopup="menu"
                    aria-label={t('Trocar de roadmap')}
                    onClick={() => onOpenOverlay('switcher')}
                    className="mb-3 flex h-11 items-center justify-between gap-2 rounded-sm bg-elevated px-3 text-sm font-bold inset-ring inset-ring-strong hover:bg-active"
                >
                    <span className="truncate">{currentRoadmap.name}</span>
                    <ChevronDownIcon width={16} height={16} />
                </button>
            )}
            <button
                type="button"
                aria-label={t('Buscar tópico')}
                onClick={() => onOpenOverlay('search')}
                className="mb-3 flex h-10.5 items-center gap-3 rounded-sm px-3 text-sm font-semibold text-secondary hover:bg-active/60 hover:text-text"
            >
                <SearchIcon />
                <span>{t('buscar tópico…')}</span>
                <span className="ml-auto">
                    <Kbd>⌘K</Kbd>
                </span>
            </button>
            {MAIN_ITEMS.map((item) => (
                <SidebarLink
                    key={item.href}
                    item={item}
                    isActive={isActivePath(pathname, item.href)}
                    count={item.showsReviewCount ? chrome.reviewsDue : undefined}
                />
            ))}
            <div className="min-h-4 flex-1" />
            <SidebarLink
                item={SETTINGS_ITEM}
                isActive={isActivePath(pathname, SETTINGS_ITEM.href)}
            />
            <Link
                href="/import"
                className="mt-2 flex h-11 items-center justify-center gap-2 rounded-full bg-elevated px-3 text-sm font-bold text-text inset-ring inset-ring-strong hover:bg-active"
            >
                <PlusIcon strokeWidth={2} />
                {t('Adicionar roadmap')}
            </Link>
            <button
                type="button"
                aria-haspopup="menu"
                aria-label={t('Menu do perfil de :name', {
                    name: chrome.profileName,
                })}
                onClick={() => onOpenOverlay('profile')}
                className="mt-3 flex h-11 items-center gap-3 rounded-sm px-3 text-sm font-bold hover:bg-active/60"
            >
                <span className="flex size-7 items-center justify-center rounded-full bg-active text-xs text-accent">
                    {chrome.profileName.charAt(0)}
                </span>
                {chrome.profileName}
            </button>
        </nav>
    );
}

function SidebarLink({
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
                'flex h-10.5 items-center gap-3 rounded-sm px-3 text-sm',
                isActive
                    ? 'bg-active font-bold text-white'
                    : 'font-semibold text-secondary hover:bg-active/60 hover:text-text',
            )}
        >
            <item.icon className={cn('shrink-0', isActive && 'text-accent')} />
            <span>{t(item.label)}</span>
            {count !== undefined && (
                <span
                    className={cn(
                        'ml-auto font-mono text-[11px] font-normal',
                        isActive ? 'text-muted' : 'text-faint',
                    )}
                >
                    {count}
                </span>
            )}
        </Link>
    );
}
