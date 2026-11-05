import { RoadmapArchived } from '@/components/roadmap/roadmap-archived';
import { RoadmapFilters } from '@/components/roadmap/roadmap-filters';
import { RoadmapHeader } from '@/components/roadmap/roadmap-header';
import { RoadmapImportNotice } from '@/components/roadmap/roadmap-import-notice';
import {
    allTopicsOf,
    countTopicsByFilter,
} from '@/components/roadmap/roadmap-progress';
import { RoadmapTree } from '@/components/roadmap/roadmap-tree';
import type { RoadmapData } from '@/components/roadmap/types';
import { useRoadmap } from '@/components/roadmap/use-roadmap';
import { sampleRoadmapData } from '@/lib/sample/roadmap';

export default function Roadmap(props: Partial<RoadmapData>) {
    const data = { ...sampleRoadmapData, ...props };
    const { filter, pickFilter, expandedSectionIds, toggleSection } =
        useRoadmap(data.sections, data.expandedSectionIds);
    const counts = countTopicsByFilter(allTopicsOf(data.sections));

    return (
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-7">
            <RoadmapHeader data={data} />
            {data.importSummary && (
                <RoadmapImportNotice summary={data.importSummary} />
            )}
            <RoadmapFilters
                activeFilter={filter}
                counts={counts}
                onPick={pickFilter}
            />
            <RoadmapTree
                sections={data.sections}
                filter={filter}
                today={data.today}
                expandedSectionIds={expandedSectionIds}
                onToggleSection={toggleSection}
            />
            <RoadmapArchived topics={data.archivedTopics} />
        </div>
    );
}
