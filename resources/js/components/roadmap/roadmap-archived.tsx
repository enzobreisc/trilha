import type { ArchivedTopic } from '@/components/roadmap/types';
import { Card } from '@/components/ui/card';
import { DataRow } from '@/components/ui/data-row';
import { ChevronDownIcon } from '@/components/ui/icons';
import { useTranslation } from '@/hooks/use-translation';

export function RoadmapArchived({ topics }: { topics: ArchivedTopic[] }) {
    const { t, plural, shortDate } = useTranslation();

    if (topics.length === 0) {
        return null;
    }

    return (
        <Card className="bg-bg">
            <details className="group">
                <summary className="flex cursor-pointer list-none items-center gap-3 [&::-webkit-details-marker]:hidden">
                    <span className="text-xs font-extrabold tracking-widest text-muted uppercase">
                        {t('arquivados')}
                    </span>
                    <span className="font-mono text-xs text-faint">
                        {topics.length}
                    </span>
                    <ChevronDownIcon
                        width={16}
                        height={16}
                        className="ml-auto text-faint transition-transform group-open:rotate-180"
                    />
                </summary>
                <div className="mt-4 flex flex-col">
                    {topics.map((topic) => (
                        <DataRow
                            key={topic.id}
                            label={topic.title}
                            value={
                                <span className="font-normal text-muted">
                                    {t('saiu do arquivo em :date · :sessions', {
                                        date: shortDate(topic.restoredOn),
                                        sessions: plural(
                                            topic.sessionCount,
                                            'sessão',
                                            'sessões',
                                        ),
                                    })}
                                </span>
                            }
                        />
                    ))}
                </div>
            </details>
        </Card>
    );
}
