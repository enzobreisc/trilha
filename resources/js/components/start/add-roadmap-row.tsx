import { Link } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';

export function AddRoadmapRow() {
    const { t } = useTranslation();

    return (
        <Link
            href="/import"
            className="flex flex-wrap items-baseline gap-x-3 gap-y-1 px-5 py-4 font-mono text-xs text-muted transition-colors hover:bg-active/60 hover:text-secondary"
        >
            <span aria-hidden="true" className="text-accent">
                +
            </span>
            <span className="text-sm font-bold text-text">
                {t('adicionar roadmap')}
            </span>
            <span>
                {t('importe um .json, cada roadmap guarda o próprio progresso')}
            </span>
        </Link>
    );
}
