import {
    SECTION_CLASSES,
    SECTION_LABEL_CLASSES,
} from '@/components/manage-roadmap/dialog-styles';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';

export function ArchiveRoadmapRow() {
    const { t } = useTranslation();

    return (
        <section className={SECTION_CLASSES}>
            <span className={SECTION_LABEL_CLASSES}>{t('Arquivar')}</span>
            <p className="text-sm leading-6 text-secondary">
                {t(
                    'Some da lista de roadmaps e das revisões. Nada é apagado e dá para desarquivar.',
                )}
            </p>
            <div>
                <Button variant="secondary">{t('Arquivar')}</Button>
            </div>
        </section>
    );
}
