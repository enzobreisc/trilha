import { useState } from 'react';
import ManageRoadmapDialog from '@/components/manage-roadmap/manage-roadmap-dialog';
import { AddRoadmapCard } from '@/components/start/add-roadmap-card';
import { EllipsisIcon } from '@/components/start/ellipsis-icon';
import { RoadmapCard } from '@/components/start/roadmap-card';
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
        <section className="flex flex-col gap-4">
            <header className="flex items-center justify-between gap-3">
                <SectionTitle>{t('roadmaps')}</SectionTitle>
                <div className="flex items-center gap-3 text-xs font-semibold text-faint">
                    <span>
                        {plural(roadmaps.length, 'roadmap', 'roadmaps')}
                    </span>
                    <button
                        type="button"
                        aria-label={t('Gerenciar roadmap')}
                        onClick={() => setIsManageDialogOpen(true)}
                        className="flex size-7 items-center justify-center rounded-full text-muted hover:bg-active hover:text-text"
                    >
                        <EllipsisIcon />
                    </button>
                </div>
            </header>
            <div className="grid gap-4 md:grid-cols-2">
                {roadmaps.map((roadmap) => (
                    <RoadmapCard
                        key={roadmap.id}
                        roadmap={roadmap}
                        isLastStudied={roadmap.id === lastStudiedId}
                    />
                ))}
                <AddRoadmapCard />
            </div>
            <ManageRoadmapDialog
                open={isManageDialogOpen}
                onClose={() => setIsManageDialogOpen(false)}
            />
        </section>
    );
}
