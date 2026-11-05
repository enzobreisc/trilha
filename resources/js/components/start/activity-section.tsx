import { ActivityRow } from '@/components/start/activity-row';
import { Section } from '@/components/start/section';
import type { StartActivityEntry } from '@/components/start/types';
import { useTranslation } from '@/hooks/use-translation';

export function ActivitySection({
    entries,
    today,
}: {
    entries: StartActivityEntry[];
    today: string;
}) {
    const { t } = useTranslation();

    return (
        <Section title={t('atividade recente')} aside={t('todos os roadmaps')}>
            <ol className="flex flex-col">
                {entries.map((entry) => (
                    <ActivityRow key={entry.id} entry={entry} today={today} />
                ))}
            </ol>
        </Section>
    );
}
