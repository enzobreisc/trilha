import { NextTopicCard } from '@/components/home/next-topic-card';
import type { TopicSummary } from '@/components/home/types';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';

export function NoTopicSection({
    completedTopicTitle,
    nextTopic,
}: {
    completedTopicTitle: string;
    nextTopic: TopicSummary;
}) {
    const { t } = useTranslation();

    return (
        <Card
            title={t('tópico atual')}
            aside={t('próximo na trilha')}
            className="bg-elevated inset-ring-strong"
        >
            <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-muted">
                    {t('nenhum tópico em estudo')}
                </p>
                <p className="text-base text-secondary">
                    {t('Você concluiu :topic. O próximo na trilha é:', {
                        topic: completedTopicTitle,
                    })}
                </p>
            </div>
            <NextTopicCard topic={nextTopic} />
            <p className="text-sm font-medium text-faint">
                {t('Concluir um tópico agenda as revisões de 7 e 30 dias.')}
            </p>
        </Card>
    );
}
