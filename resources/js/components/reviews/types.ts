export type ReviewOutcome = 'ok' | 'again';

export type ReviewQuestionKey = 'explain' | 'build' | 'solo';

export type ReviewItem = {
    id: string;
    title: string;
    roadmapId: string;
    path: string;
    summary: string;
    interval: string;
    topicHref: string;
};

export type ReviewDay = {
    date: string;
    count: number;
    isToday?: boolean;
};

export type UpcomingReview = {
    date: string;
    title: string;
    roadmapId: string;
    roadmapName: string;
    interval: string;
};

export type ReviewAnswer = Partial<Record<ReviewQuestionKey, boolean>>;

export type ReviewAnswers = Record<string, ReviewAnswer>;

export type ReviewResults = Record<string, ReviewOutcome>;
