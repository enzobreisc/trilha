import type { RoadmapSummary } from '@/types/roadmap';

export type RoadmapState = 'completed' | 'notStarted' | 'inProgress';

export function getRoadmapState(roadmap: RoadmapSummary): RoadmapState {
    if (roadmap.doneTopics === roadmap.totalTopics) {
        return 'completed';
    }
    if (roadmap.lastStudiedDaysAgo === null) {
        return 'notStarted';
    }
    return 'inProgress';
}

export function getProgressPercent(roadmap: RoadmapSummary): number {
    return Math.round((roadmap.doneTopics / roadmap.totalTopics) * 100);
}
