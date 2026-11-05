import type { SessionActivity, TopicEntry } from '@/components/session/types';
import type { TopicTreeSection } from '@/types/topic';

const MINUTES_PER_HOUR = 60;

export function flattenTopics(sections: TopicTreeSection[]): TopicEntry[] {
    return sections.flatMap((section) =>
        section.groups.flatMap((group) =>
            group.topics.map((topic) => ({
                id: topic.id,
                title: topic.title,
                status: topic.status,
                path: `${section.number} ${section.name.toLowerCase()} / ${group.name.toLowerCase()}`,
            })),
        ),
    );
}

export function resolveInitialTopicId(
    topics: TopicEntry[],
    requestedId: string | undefined,
): string {
    const requestedTopic = topics.find((topic) => topic.id === requestedId);
    return (requestedTopic ?? topics[0])?.id ?? '';
}

export function toggleActivity(
    activities: SessionActivity[],
    activity: SessionActivity,
): SessionActivity[] {
    return activities.includes(activity)
        ? activities.filter((item) => item !== activity)
        : [...activities, activity];
}

export function formatSessionDuration(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / MINUTES_PER_HOUR);
    const minutes = totalMinutes % MINUTES_PER_HOUR;

    if (hours === 0) {
        return `${minutes}m`;
    }
    if (minutes === 0) {
        return `${hours}h`;
    }
    return `${hours}h${String(minutes).padStart(2, '0')}`;
}
