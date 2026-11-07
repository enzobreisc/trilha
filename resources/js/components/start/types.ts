import type { ManagedRoadmap } from '@/components/manage-roadmap/types';
import type { ContributionDay } from '@/types/contribution';
import type { RoadmapSummary } from '@/types/roadmap';

export type StartReview = {
    id: string;
    title: string;
    roadmapTag: string;
    intervalLabel: string;
};

export type StartActivityEntry = {
    id: string;
    date: string;
    time: string | null;
    topicTitle: string;
    roadmapId: string;
    minutes: number;
};

export type StartStats = {
    streakDays: number;
    sessionCount: number;
};

export type StartPageData = {
    roadmaps: RoadmapSummary[];
    archivedRoadmaps: ManagedRoadmap[];
    reviews: StartReview[];
    activity: StartActivityEntry[];
    contributionDays: ContributionDay[];
    stats: StartStats;
};
