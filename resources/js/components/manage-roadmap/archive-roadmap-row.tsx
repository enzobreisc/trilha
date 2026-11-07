import { router } from '@inertiajs/react';
import {
    SECTION_CLASSES,
    SECTION_LABEL_CLASSES,
} from '@/components/manage-roadmap/dialog-styles';
import type { ManagedRoadmap } from '@/components/manage-roadmap/types';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';

export function ArchiveRoadmapRow({ roadmap }: { roadmap: ManagedRoadmap }) {
    const { t } = useTranslation();
    const archiveUrl = `/roadmaps/${roadmap.id}/archive`;

    function toggleArchive() {
        if (roadmap.isArchived) {
            router.delete(archiveUrl);
            return;
        }
        router.put(archiveUrl);
    }

    return (
        <section className={SECTION_CLASSES}>
            <span className={SECTION_LABEL_CLASSES}>
                {roadmap.isArchived ? t('Desarquivar') : t('Arquivar')}
            </span>
            <p className="text-sm leading-6 text-secondary">
                {t(
                    'Some da lista de roadmaps e das revisões. Nada é apagado e dá para desarquivar.',
                )}
            </p>
            <div>
                <Button variant="secondary" onClick={toggleArchive}>
                    {roadmap.isArchived ? t('Desarquivar') : t('Arquivar')}
                </Button>
            </div>
        </section>
    );
}
