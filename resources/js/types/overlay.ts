import type { TranslationKey } from '@/lib/i18n';
import type { AppChrome } from '@/types/app-chrome';
import type { TopicStatus } from '@/types/topic';

export type OverlayName = 'switcher' | 'search' | 'profile' | 'shortcuts';

export type OverlayProps = {
    chrome: AppChrome;
    onClose: () => void;
    onOpenOverlay: (overlay: OverlayName) => void;
};

export type SearchTopic = {
    id: string;
    title: string;
    status: TopicStatus;
    href: string;
    roadmapName: string;
    location: string;
};

export type SearchAction = {
    id: string;
    label: TranslationKey;
    href?: string;
    onSelect?: () => void;
};
