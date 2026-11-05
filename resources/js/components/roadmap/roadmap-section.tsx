import { RoadmapGroup } from '@/components/roadmap/roadmap-group';
import {
    countCompleted,
    topicsOf,
} from '@/components/roadmap/roadmap-progress';
import type {
    RoadmapFilter,
    RoadmapSectionData,
} from '@/components/roadmap/types';
import { SegmentedProgress } from '@/components/segmented-progress';
import { Card } from '@/components/ui/card';
import { ChevronDownIcon } from '@/components/ui/icons';
import { cn } from '@/lib/utils';

export function RoadmapSection({
    section,
    filter,
    today,
    isExpanded,
    onToggle,
}: {
    section: RoadmapSectionData;
    filter: RoadmapFilter;
    today: string;
    isExpanded: boolean;
    onToggle: () => void;
}) {
    const topics = topicsOf(section);
    const completedCount = countCompleted(topics);

    return (
        <Card>
            <button
                type="button"
                aria-expanded={isExpanded}
                onClick={onToggle}
                className="flex items-center gap-4 text-left"
            >
                <ChevronDownIcon
                    width={16}
                    height={16}
                    className={cn(
                        'shrink-0 text-faint transition-transform',
                        isExpanded && 'rotate-180',
                    )}
                />
                <span className="font-mono text-xs text-faint">
                    {section.number}
                </span>
                <span className="font-display text-base font-bold">
                    {section.name}
                </span>
                <SegmentedProgress
                    className="min-w-0 flex-1"
                    filled={completedCount}
                    total={topics.length}
                />
                <span className="font-mono text-xs text-muted">
                    {completedCount}/{topics.length}
                </span>
            </button>
            {isExpanded && (
                <div className="flex flex-col gap-5">
                    {section.groups.map((group) => (
                        <RoadmapGroup
                            key={group.name}
                            group={group}
                            filter={filter}
                            today={today}
                        />
                    ))}
                </div>
            )}
        </Card>
    );
}
