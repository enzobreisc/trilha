import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';

export function NotesSection({
    notes,
    onNotesChange,
}: {
    notes: string;
    onNotesChange: (notes: string) => void;
}) {
    const { t } = useTranslation();

    return (
        <Card
            title={t('anotações')}
            aside={<span className="text-accent">{t('salvo agora')}</span>}
        >
            <textarea
                aria-label={t('anotações')}
                rows={8}
                value={notes}
                onChange={(event) => onNotesChange(event.target.value)}
                className="box-border w-full resize-y rounded-md bg-surface p-4 text-sm leading-6 text-secondary inset-ring inset-ring-border focus:inset-ring-accent focus:outline-none"
            />
        </Card>
    );
}
