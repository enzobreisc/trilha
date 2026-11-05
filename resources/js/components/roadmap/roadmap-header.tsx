import {
    allTopicsOf,
    countCompleted,
    countTopicsByFilter,
} from '@/components/roadmap/roadmap-progress';
import type { RoadmapData } from '@/components/roadmap/types';
import { ButtonLink } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { useTranslation } from '@/hooks/use-translation';

export function RoadmapHeader({ data }: { data: RoadmapData }) {
    const { t, shortDate } = useTranslation();
    const topics = allTopicsOf(data.sections);
    const completedCount = countCompleted(topics);
    const reviewCount = countTopicsByFilter(topics).review;
    const progressLabel = t(':completed/:total concluídos', {
        completed: completedCount,
        total: topics.length,
    });
    const reviewLabel = t(':count para revisar', { count: reviewCount });

    return (
        <div className="flex flex-col gap-3">
            <PageHeader
                title={data.title}
                description={`${progressLabel} · ${reviewLabel}`}
                actions={
                    <ButtonLink variant="secondary" href="/import">
                        {t('Reimportar')}
                    </ButtonLink>
                }
            />
            <p className="font-mono text-xs text-muted">
                {data.sourceLabel} · {data.sourceFile} ·{' '}
                {t('importado em :date', {
                    date: shortDate(data.importedOn),
                })}
            </p>
        </div>
    );
}
