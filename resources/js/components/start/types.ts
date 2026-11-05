export type StartReview = {
    id: string;
    title: string;
    roadmapTag: string;
    intervalLabel: string;
};

export type ActivityTone = 'bright' | 'mid';

export type StartActivityEntry = {
    id: string;
    date: string;
    time: string | null;
    roadmapSlug: string;
    detail: string;
    tone: ActivityTone;
};

export type StartStats = {
    streakDays: number;
    sessionCount: number;
};
