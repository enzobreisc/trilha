import type {
    RoadmapFilter,
    RoadmapSectionData,
    RoadmapTopic,
} from '@/components/roadmap/types';
import type { TopicStatus } from '@/types/topic';

export function topicsOf(section: RoadmapSectionData): RoadmapTopic[] {
    return section.groups.flatMap((group) => group.topics);
}

export function allTopicsOf(sections: RoadmapSectionData[]): RoadmapTopic[] {
    return sections.flatMap(topicsOf);
}

export function isCompletedStatus(status: TopicStatus): boolean {
    return status === 'done' || status === 'review';
}

export function countCompleted(topics: RoadmapTopic[]): number {
    return topics.filter((topic) => isCompletedStatus(topic.status)).length;
}

export function matchesFilter(
    status: TopicStatus,
    filter: RoadmapFilter,
): boolean {
    return filter === 'all' || status === filter;
}

export function hasMatchingTopic(
    section: RoadmapSectionData,
    filter: RoadmapFilter,
): boolean {
    return topicsOf(section).some((topic) =>
        matchesFilter(topic.status, filter),
    );
}

export function countTopicsByFilter(
    topics: RoadmapTopic[],
): Record<RoadmapFilter, number> {
    const counts: Record<RoadmapFilter, number> = {
        all: topics.length,
        todo: 0,
        studying: 0,
        review: 0,
        done: 0,
    };
    for (const topic of topics) {
        counts[topic.status] += 1;
    }
    return counts;
}
