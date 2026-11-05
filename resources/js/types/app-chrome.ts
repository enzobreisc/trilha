import type { RoadmapOption } from '@/types/roadmap';

export type AppChrome = {
    profileName: string;
    roadmaps: RoadmapOption[];
    currentRoadmapId: string;
    reviewsDue: number;
};
