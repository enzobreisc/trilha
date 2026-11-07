import { TopicSection } from '@/components/topic/topic-section';
import { useTranslation } from '@/hooks/use-translation';

export function NotesSection({
    notes,
    isSaved,
    onNotesChange,
}: {
    notes: string;
    isSaved: boolean;
    onNotesChange: (notes: string) => void;
}) {
    const { t } = useTranslation();

    return (
        <TopicSection
            title={t('anotações')}
            aside={
                <span className={isSaved ? 'text-accent' : 'text-muted'}>
                    {isSaved ? t('salvo') : t('salvando…')}
                </span>
            }
        >
            <textarea
                aria-label={t('anotações')}
                rows={8}
                value={notes}
                onChange={(event) => onNotesChange(event.target.value)}
                className="box-border w-full resize-y border border-strong bg-surface p-3 font-mono text-xs leading-[22px] text-secondary focus:border-accent focus:outline-none"
            />
        </TopicSection>
    );
}
