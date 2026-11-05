import type { RoadmapState } from '@/components/start/roadmap-progress';
import { useTranslation } from '@/hooks/use-translation';
import type { RoadmapSummary } from '@/types/roadmap';

export function RoadmapStatusContent({
    roadmap,
    state,
}: {
    roadmap: RoadmapSummary;
    state: RoadmapState;
}) {
    const { t } = useTranslation();
    const { currentTopic } = roadmap;

    if (state === 'completed') {
        return (
            <>
                {t('concluído')} ·{' '}
                {t('todos os :count tópicos dominados', {
                    count: roadmap.totalTopics,
                })}
            </>
        );
    }

    if (state === 'notStarted') {
        return (
            <>
                {t('ainda não começou')} · {t('primeiro tópico')}{' '}
                <span className="text-secondary">{currentTopic.title}</span>
            </>
        );
    }

    return (
        <>
            {t('parou em')}{' '}
            <span className="text-text">{currentTopic.title}</span>{' '}
            <span className="text-muted">· {currentTopic.section}</span>
        </>
    );
}
