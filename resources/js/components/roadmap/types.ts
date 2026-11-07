import type { TopicStatus, TopicTreeTopic } from '@/types/topic';

export type RoadmapFilter = 'all' | TopicStatus;

export type RoadmapTopic = TopicTreeTopic & {
    statusDate: string | null;
};

export type RoadmapGroup = {
    name: string;
    topics: RoadmapTopic[];
};

export type RoadmapSectionData = {
    id: string;
    number: string;
    name: string;
    groups: RoadmapGroup[];
};

export type ArchivedTopic = {
    id: string;
    title: string;
    archivedOn: string;
    sessionCount: number;
};

export type ImportSummary = {
    fileName: string;
    addedCount: number;
    changedCount: number;
    archivedCount: number;
};

export type RoadmapData = {
    title: string;
    sourceLabel: string;
    sourceFile: string;
    importedOn: string;
    importSummary: ImportSummary | null;
    sections: RoadmapSectionData[];
    archivedTopics: ArchivedTopic[];
    expandedSectionIds: string[];
};
