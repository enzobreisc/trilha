import { RoadmapArchived } from '@/components/roadmap/roadmap-archived';
import { RoadmapCurrentTopic } from '@/components/roadmap/roadmap-current-topic';
import { RoadmapFilters } from '@/components/roadmap/roadmap-filters';
import { RoadmapHeader } from '@/components/roadmap/roadmap-header';
import { RoadmapImportNotice } from '@/components/roadmap/roadmap-import-notice';
import {
    allTopicsOf,
    countTopicsByFilter,
} from '@/components/roadmap/roadmap-progress';
import { RoadmapSource } from '@/components/roadmap/roadmap-source';
import { RoadmapTree } from '@/components/roadmap/roadmap-tree';
import type { RoadmapData } from '@/components/roadmap/types';
import { useRoadmap } from '@/components/roadmap/use-roadmap';
import { useToday } from '@/hooks/use-chrome';

export default function Roadmap(data: RoadmapData) {
    const today = useToday();
    const { filter, pickFilter, expandedSectionIds, toggleSection } =
        useRoadmap(data.sections, data.expandedSectionIds);
    const counts = countTopicsByFilter(allTopicsOf(data.sections));

    return (
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
            {data.importSummary && (
                <RoadmapImportNotice summary={data.importSummary} />
            )}
            <RoadmapHeader data={data} />
            <RoadmapCurrentTopic sections={data.sections} />
            <RoadmapFilters
                activeFilter={filter}
                counts={counts}
                onPick={pickFilter}
            />
            <RoadmapTree
                sections={data.sections}
                filter={filter}
                today={today}
                expandedSectionIds={expandedSectionIds}
                onToggleSection={toggleSection}
            />
            <RoadmapArchived topics={data.archivedTopics} />
            <RoadmapSource data={data} />
        </div>
    );
}
