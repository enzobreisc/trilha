import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';

export function ArchiveRoadmapRow() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
            <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-text">
                    {t('Arquivar')}
                </span>
                <span className="text-xs text-faint">
                    {t(
                        'Some da lista de roadmaps e das revisões. Nada é apagado e dá para desarquivar.',
                    )}
                </span>
            </div>
            <Button variant="secondary">{t('Arquivar')}</Button>
        </div>
    );
}
