import { Link } from '@inertiajs/react';
import { PlusIcon } from '@/components/ui/icons';
import { useTranslation } from '@/hooks/use-translation';

export function AddRoadmapCard() {
    const { t } = useTranslation();

    return (
        <Link
            href="/import"
            className="flex flex-col items-center justify-center gap-2 rounded-md border border-dashed border-strong p-5 text-center text-sm font-medium text-muted transition-colors hover:bg-active/60 hover:text-secondary"
        >
            <span className="flex size-9 items-center justify-center rounded-full bg-active text-text">
                <PlusIcon />
            </span>
            <span className="font-semibold text-text">
                {t('adicionar roadmap')}
            </span>
            <span>
                {t('importe um .json, cada roadmap guarda o próprio progresso')}
            </span>
        </Link>
    );
}
