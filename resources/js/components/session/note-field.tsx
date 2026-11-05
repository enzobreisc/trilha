import { useId } from 'react';
import { FIELD_CAPTION_CLASSES } from '@/components/session/field-caption';
import { useTranslation } from '@/hooks/use-translation';

export function NoteField({
    value,
    onChange,
}: {
    value: string;
    onChange: (note: string) => void;
}) {
    const { t } = useTranslation();
    const noteId = useId();

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={noteId} className={FIELD_CAPTION_CLASSES}>
                {t('nota')}
            </label>
            <textarea
                id={noteId}
                rows={3}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="box-border min-h-18 w-full resize-none rounded-sm bg-surface px-3.5 py-2.5 text-sm leading-6 text-secondary inset-ring inset-ring-strong focus:inset-ring-accent"
            />
        </div>
    );
}
