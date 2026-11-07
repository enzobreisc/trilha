import { useState } from 'react';
import ManageRoadmapDialog from '@/components/manage-roadmap/manage-roadmap-dialog';
import type { ManagedRoadmap } from '@/components/manage-roadmap/types';
import { AddRoadmapRow } from '@/components/start/add-roadmap-row';
import { ArchivedRoadmapRow } from '@/components/start/archived-roadmap-row';
import { RoadmapRow } from '@/components/start/roadmap-row';
import { SectionTitle } from '@/components/ui/page-header';
import { useTranslation } from '@/hooks/use-translation';
import type { RoadmapSummary } from '@/types/roadmap';

export function RoadmapsSection({
    roadmaps,
    archivedRoadmaps,
    lastStudiedId,
}: {
    roadmaps: RoadmapSummary[];
    archivedRoadmaps: ManagedRoadmap[];
    lastStudiedId: string | undefined;
}) {
    const { t, plural } = useTranslation();
    const [managedRoadmap, setManagedRoadmap] = useState<ManagedRoadmap>();

    return (
        <section className="flex min-w-0 flex-col rounded-sm border border-border bg-surface">
            <header className="flex items-center justify-between gap-3 border-b border-border px-5 py-2.5">
                <SectionTitle>{t('roadmaps')}</SectionTitle>
                <span className="font-mono text-xs text-muted">
                    {plural(roadmaps.length, 'roadmap', 'roadmaps')}
                </span>
            </header>
            {roadmaps.map((roadmap) => (
                <RoadmapRow
                    key={roadmap.id}
                    roadmap={roadmap}
                    isLastStudied={roadmap.id === lastStudiedId}
                    onManage={() => setManagedRoadmap(roadmap.management)}
                />
            ))}
            <AddRoadmapRow />
            {archivedRoadmaps.length > 0 && (
                <div className="flex flex-col border-t border-border">
                    <p className="px-5 pt-3 font-mono text-[11px] tracking-[0.08em] text-muted uppercase">
                        {t('arquivados')}
                    </p>
                    {archivedRoadmaps.map((roadmap) => (
                        <ArchivedRoadmapRow
                            key={roadmap.id}
                            roadmap={roadmap}
                            onManage={() => setManagedRoadmap(roadmap)}
                        />
                    ))}
                </div>
            )}
            {managedRoadmap && (
                <ManageRoadmapDialog
                    roadmap={managedRoadmap}
                    onClose={() => setManagedRoadmap(undefined)}
                />
            )}
        </section>
    );
}
