export type HomeStats = {
    weekLabel: string;
    weekStudyTime: string;
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

export type TopicLogKind = 'session' | 'exercise' | 'comparison';

export type TopicLogEntry = {
    when: string;
    kind: TopicLogKind;
    detail: string;
};

export type CurrentTopic = TopicSummary & {
    id: string;
    startedOn: string;
    timeSpent: string;
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
    profileName: string;
    dateLabel: string;
    roadmapName: string;
    stats: HomeStats;
    progress: HomeProgress;
    currentTopic: CurrentTopic | null;
    completedTopicTitle: string;
    nextTopic: TopicSummary;
    reviews: ReviewItem[];
};
