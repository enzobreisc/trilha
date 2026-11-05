import { OverlayContainer } from '@/components/overlays/overlay-container';
import { GridIcon } from '@/components/overlays/overlay-icons';
import {
    OverlayMenuCaption,
    OverlayMenuDivider,
    OverlayMenuRow,
} from '@/components/overlays/overlay-menu-row';
import { PlusIcon } from '@/components/ui/icons';
import { useTranslation } from '@/hooks/use-translation';
import type { OverlayProps } from '@/types/overlay';

export function RoadmapSwitcherOverlay({ chrome, onClose }: OverlayProps) {
    const { t } = useTranslation();

    return (
        <OverlayContainer
            role="menu"
            label={t('Trocar de roadmap')}
            onClose={onClose}
            className="top-30 left-3.5 w-85"
        >
            <div className="flex flex-col gap-0.5 p-2">
                <OverlayMenuCaption>
                    {t('trocar de roadmap')}
                </OverlayMenuCaption>
                {chrome.roadmaps.map((roadmap) => (
                    <OverlayMenuRow
                        key={roadmap.id}
                        href="/"
                        label={roadmap.name}
                        detail={`${roadmap.doneTopics}/${roadmap.totalTopics}`}
                        isCurrent={roadmap.id === chrome.currentRoadmapId}
                    />
                ))}
                <OverlayMenuDivider />
                <OverlayMenuRow
                    href="/start"
                    label={t('todos os roadmaps')}
                    icon={<GridIcon />}
                />
                <OverlayMenuRow
                    href="/import"
                    label={t('adicionar roadmap…')}
                    icon={<PlusIcon />}
                />
            </div>
        </OverlayContainer>
    );
}
