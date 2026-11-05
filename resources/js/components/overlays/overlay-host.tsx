import type { ComponentType } from 'react';
import { ProfileOverlay } from '@/components/overlays/profile-overlay';
import { RoadmapSwitcherOverlay } from '@/components/overlays/roadmap-switcher-overlay';
import { SearchOverlay } from '@/components/overlays/search-overlay';
import { ShortcutsOverlay } from '@/components/overlays/shortcuts-overlay';
import type { OverlayName, OverlayProps } from '@/types/overlay';

const OVERLAY_COMPONENTS: Record<OverlayName, ComponentType<OverlayProps>> = {
    switcher: RoadmapSwitcherOverlay,
    search: SearchOverlay,
    profile: ProfileOverlay,
    shortcuts: ShortcutsOverlay,
};

export function OverlayHost({
    overlay,
    ...overlayProps
}: OverlayProps & { overlay: OverlayName }) {
    const Overlay = OVERLAY_COMPONENTS[overlay];

    return <Overlay {...overlayProps} />;
}
