import {
    allTopicsOf,
    hasMatchingTopic,
} from '@/components/roadmap/roadmap-progress';
import { RoadmapSection } from '@/components/roadmap/roadmap-section';
import type {
    RoadmapFilter,
    RoadmapSectionData,
} from '@/components/roadmap/types';
import { SectionTitle } from '@/components/ui/page-header';
import { useTranslation } from '@/hooks/use-translation';

export function RoadmapTree({
    sections,
    filter,
    today,
    expandedSectionIds,
    onToggleSection,
}: {
    sections: RoadmapSectionData[];
    filter: RoadmapFilter;
    today: string;
    expandedSectionIds: Set<string>;
    onToggleSection: (id: string) => void;
}) {
    const { t, plural } = useTranslation();
    const visibleSections = sections.filter((section) =>
        hasMatchingTopic(section, filter),
    );
    const aside = `${plural(sections.length, 'seção', 'seções')} · ${plural(
        allTopicsOf(sections).length,
        'tópico',
        'tópicos',
    )}`;

    return (
        <section className="flex flex-col gap-4">
            <header className="flex items-center justify-between gap-3">
                <SectionTitle>{t('seções')}</SectionTitle>
                <span className="font-mono text-xs text-muted">{aside}</span>
            </header>
            {visibleSections.map((section) => (
                <RoadmapSection
                    key={section.id}
                    section={section}
                    filter={filter}
                    today={today}
                    isExpanded={expandedSectionIds.has(section.id)}
                    onToggle={() => onToggleSection(section.id)}
                />
            ))}
        </section>
    );
}
