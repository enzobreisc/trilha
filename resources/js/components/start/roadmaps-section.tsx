import { useState } from 'react';
import ManageRoadmapDialog from '@/components/manage-roadmap/manage-roadmap-dialog';
import { AddRoadmapRow } from '@/components/start/add-roadmap-row';
import { EllipsisIcon } from '@/components/start/ellipsis-icon';
import { RoadmapRow } from '@/components/start/roadmap-row';
import { SectionTitle } from '@/components/ui/page-header';
import { useTranslation } from '@/hooks/use-translation';
import type { RoadmapSummary } from '@/types/roadmap';

export function RoadmapsSection({
    roadmaps,
    lastStudiedId,
}: {
    roadmaps: RoadmapSummary[];
    lastStudiedId: string | undefined;
}) {
    const { t, plural } = useTranslation();
    const [isManageDialogOpen, setIsManageDialogOpen] = useState(false);

    return (
        <section className="flex min-w-0 flex-col rounded-sm border border-border bg-surface">
            <header className="flex items-center justify-between gap-3 border-b border-border px-5 py-2.5">
                <SectionTitle>{t('roadmaps')}</SectionTitle>
                <div className="flex items-center gap-3 font-mono text-xs text-muted">
                    <span>
                        {plural(roadmaps.length, 'roadmap', 'roadmaps')}
                    </span>
                    <button
                        type="button"
                        aria-label={t('Gerenciar roadmap')}
                        onClick={() => setIsManageDialogOpen(true)}
                        className="flex size-7 items-center justify-center rounded-xs text-muted hover:bg-active hover:text-text"
                    >
                        <EllipsisIcon />
                    </button>
                </div>
            </header>
            {roadmaps.map((roadmap) => (
                <RoadmapRow
                    key={roadmap.id}
                    roadmap={roadmap}
                    isLastStudied={roadmap.id === lastStudiedId}
                />
            ))}
            <AddRoadmapRow />
            <ManageRoadmapDialog
                open={isManageDialogOpen}
                onClose={() => setIsManageDialogOpen(false)}
            />
        </section>
    );
}
