export type RoadmapCurrentTopic = {
    title: string;
    section: string;
    href: string;
};

export type RoadmapSummary = {
    id: string;
    name: string;
    subtitle: string;
    totalTopics: number;
    doneTopics: number;
    currentTopic: RoadmapCurrentTopic;
    reviewsDue: number;
    lastStudiedDaysAgo: number | null;
};

export type RoadmapOption = Pick<
    RoadmapSummary,
    'id' | 'name' | 'doneTopics' | 'totalTopics'
>;
