import { useState } from 'react';
import type {
    RoadmapFilter,
    RoadmapSectionData,
} from '@/components/roadmap/types';

function withToggled(ids: Set<string>, id: string): Set<string> {
    const next = new Set(ids);
    if (next.has(id)) {
        next.delete(id);
    } else {
        next.add(id);
    }
    return next;
}

export function useRoadmap(
    sections: RoadmapSectionData[],
    initialExpandedSectionIds: string[],
) {
    const [filter, setFilter] = useState<RoadmapFilter>('all');
    const [expandedSectionIds, setExpandedSectionIds] = useState(
        () => new Set(initialExpandedSectionIds),
    );

    function pickFilter(nextFilter: RoadmapFilter) {
        setFilter(nextFilter);
        if (nextFilter !== 'all') {
            setExpandedSectionIds(
                new Set(sections.map((section) => section.id)),
            );
        }
    }

    function toggleSection(id: string) {
        setExpandedSectionIds((ids) => withToggled(ids, id));
    }

    return { filter, pickFilter, expandedSectionIds, toggleSection };
}
