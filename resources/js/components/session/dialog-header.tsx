import { CloseIcon } from '@/components/session/icons';
import { useTranslation } from '@/hooks/use-translation';

export function DialogHeader({
    titleId,
    title,
    onClose,
}: {
    titleId: string;
    title: string;
    onClose: () => void;
}) {
    const { t } = useTranslation();

    return (
        <header className="flex items-center justify-between gap-3 px-6 pt-5 pb-2">
            <h2
                id={titleId}
                className="font-display text-xl font-bold tracking-tight text-text"
            >
                {title}
            </h2>
            <button
                type="button"
                aria-label={t('Fechar')}
                onClick={onClose}
                className="flex size-9 shrink-0 items-center justify-center rounded-full text-muted hover:bg-active hover:text-text"
            >
                <CloseIcon />
            </button>
        </header>
    );
}
