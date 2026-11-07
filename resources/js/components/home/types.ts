import type { SessionActivity } from '@/components/session/types';

export type HomeStats = {
    weekStart: string;
    weekEnd: string;
    weekMinutes: number;
    weekSessionCount: number;
    weekCompletedTopics: number;
    streakDays: number;
};

export type HomeProgress = {
    done: number;
    total: number;
};

export type TopicSummary = {
    title: string;
    description: string;
    breadcrumb: string;
    href: string;
};

export type TopicChecklistItem = {
    label: string;
    isDone: boolean;
};

export type TopicLogEntry = {
    date: string;
    time: string;
    minutes: number;
    activities: SessionActivity[];
    note: string | null;
};

export type CurrentTopic = TopicSummary & {
    id: string;
    startedOn: string | null;
    minutesSpent: number;
    sessionCount: number;
    checklist: TopicChecklistItem[];
    history: TopicLogEntry[];
};

export type ReviewItem = {
    id: string;
    title: string;
    area: string;
    dueIn: string;
};

export type HomeData = {
    roadmapName: string;
    stats: HomeStats;
    progress: HomeProgress;
    currentTopic: CurrentTopic | null;
    completedTopicTitle: string | null;
    nextTopic: TopicSummary | null;
    reviews: ReviewItem[];
};
