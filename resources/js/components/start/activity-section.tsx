import { ActivityRow } from '@/components/start/activity-row';
import type { StartActivityEntry } from '@/components/start/types';
import { Card } from '@/components/ui/card';
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
        <Card title={t('atividade recente')} aside={t('todos os roadmaps')}>
            <ol className="flex flex-col">
                {entries.map((entry) => (
                    <ActivityRow key={entry.id} entry={entry} today={today} />
                ))}
            </ol>
        </Card>
    );
}
