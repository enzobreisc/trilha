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

export type CurrentTopic = TopicSummary & {
    id: string;
    startedOn: string | null;
    minutesSpent: number;
    sessionCount: number;
    checklist: TopicChecklistItem[];
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
    reviewsDueCount: number;
};
