import { FIELD_CAPTION_CLASSES } from '@/components/session/field-caption';
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
        <header className="flex items-center justify-between gap-3 border-b border-border bg-chrome px-5 py-3">
            <h2 id={titleId} className={FIELD_CAPTION_CLASSES}>
                {title}
            </h2>
            <button
                type="button"
                aria-label={t('Fechar')}
                onClick={onClose}
                className="flex size-7 shrink-0 items-center justify-center rounded-xs text-muted hover:bg-active hover:text-text"
            >
                <CloseIcon />
            </button>
        </header>
    );
}
