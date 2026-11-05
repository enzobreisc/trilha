import { RoadmapTopicRow } from '@/components/roadmap/roadmap-topic-row';
import {
    countCompleted,
    matchesFilter,
} from '@/components/roadmap/roadmap-progress';
import type {
    RoadmapFilter,
    RoadmapGroup as RoadmapGroupData,
} from '@/components/roadmap/types';

export function RoadmapGroup({
    group,
    filter,
    today,
}: {
    group: RoadmapGroupData;
    filter: RoadmapFilter;
    today: string;
}) {
    const shownTopics = group.topics.filter((topic) =>
        matchesFilter(topic.status, filter),
    );
    if (shownTopics.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-col gap-0.5">
            <div className="flex items-baseline justify-between gap-3 px-3 pb-1 font-mono text-[11px] tracking-[0.08em] text-muted uppercase">
                <span>{group.name}</span>
                <span className="text-faint">
                    {countCompleted(group.topics)}/{group.topics.length}
                </span>
            </div>
            {shownTopics.map((topic) => (
                <RoadmapTopicRow key={topic.id} topic={topic} today={today} />
            ))}
        </div>
    );
}
