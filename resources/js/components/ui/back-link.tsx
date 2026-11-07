import { router } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';

const FALLBACK_ROUTE = '/start';

export function BackLink() {
    const { t } = useTranslation();

    function goBack() {
        if (window.history.length > 1) {
            window.history.back();
            return;
        }
        router.visit(FALLBACK_ROUTE);
    }

    return (
        <button
            type="button"
            onClick={goBack}
            className="w-fit font-mono text-xs text-muted hover:text-text"
        >
            ‹ {t('Voltar')}
        </button>
    );
}
