import { router } from '@inertiajs/react';
import { OverlayContainer } from '@/components/overlays/overlay-container';
import {
    OverlayMenuCaption,
    OverlayMenuDivider,
    OverlayMenuRow,
} from '@/components/overlays/overlay-menu-row';
import { useTranslation } from '@/hooks/use-translation';
import type { OverlayProps } from '@/types/overlay';

const CURRENT_ROADMAP_MARKER = '❯';

export function RoadmapSwitcherOverlay({ chrome, onClose }: OverlayProps) {
    const { t } = useTranslation();

    return (
        <OverlayContainer
            role="menu"
            label={t('Trocar de roadmap')}
            onClose={onClose}
            className="top-11.5 right-55.5 w-85"
        >
            <div className="flex flex-col gap-0.5 p-2">
                <OverlayMenuCaption>
                    {t('trocar de roadmap')}
                </OverlayMenuCaption>
                {chrome.roadmaps.map((roadmap) => {
                    const isCurrent = roadmap.id === chrome.currentRoadmapId;

                    return (
                        <OverlayMenuRow
                            key={roadmap.id}
                            onSelect={() =>
                                router.put(`/roadmaps/${roadmap.id}/select`)
                            }
                            label={roadmap.name}
                            marker={
                                isCurrent ? CURRENT_ROADMAP_MARKER : undefined
                            }
                            detail={`${roadmap.doneTopics}/${roadmap.totalTopics}`}
                            isCurrent={isCurrent}
                            isHighlighted={isCurrent}
                        />
                    );
                })}
                <OverlayMenuDivider />
                <OverlayMenuRow href="/start" label={t('todos os roadmaps')} />
                <OverlayMenuRow
                    href="/import"
                    label={t('adicionar roadmap…')}
                    marker="+"
                />
            </div>
        </OverlayContainer>
    );
}
