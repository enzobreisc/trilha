import type { ReviewItem } from './types';

export const ALL_ROADMAPS_FILTER = 'all';

export type ReviewRoadmap = {
    id: string;
    count: number;
};

export function findReviewRoadmaps(items: ReviewItem[]): ReviewRoadmap[] {
    const countsByRoadmapId = new Map<string, number>();

    items.forEach((item) => {
        countsByRoadmapId.set(
            item.roadmapId,
            (countsByRoadmapId.get(item.roadmapId) ?? 0) + 1,
        );
    });

    return [...countsByRoadmapId].map(([id, count]) => ({ id, count }));
}
