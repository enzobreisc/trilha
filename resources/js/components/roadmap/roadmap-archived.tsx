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
                <summary className="flex cursor-pointer list-none items-center gap-3 font-mono text-[11px] tracking-[0.08em] text-muted uppercase [&::-webkit-details-marker]:hidden">
                    <span>{t('arquivados')}</span>
                    <span className="text-faint">{topics.length}</span>
                    <ChevronDownIcon
                        width={14}
                        height={14}
                        className="ml-auto text-faint transition-transform group-open:rotate-180"
                    />
                </summary>
                <div className="mt-3 flex flex-col gap-1.5">
                    {topics.map((topic) => (
                        <DataRow
                            key={topic.id}
                            label={topic.title}
                            value={
                                <span className="text-muted">
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
