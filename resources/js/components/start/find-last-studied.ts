import type { RoadmapSummary } from '@/types/roadmap';

export function findLastStudiedRoadmap(
    roadmaps: RoadmapSummary[],
): RoadmapSummary | undefined {
    return roadmaps
        .filter((roadmap) => roadmap.lastStudiedDaysAgo !== null)
        .sort(
            (first, second) =>
                (first.lastStudiedDaysAgo ?? 0) -
                (second.lastStudiedDaysAgo ?? 0),
        )[0];
}
