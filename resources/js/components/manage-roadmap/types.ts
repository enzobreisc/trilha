export type ManagedRoadmap = {
    id: string;
    name: string;
    slug: string;
    key: string;
    originFile: string;
    importedAt: string;
    completedTopics: number;
    totalTopics: number;
    sessionCount: number;
    noteCount: number;
    isArchived: boolean;
};
