import { NextTopicCard } from '@/components/home/next-topic-card';
import type { TopicSummary } from '@/components/home/types';
import { SectionLabel } from '@/components/ui/section-label';
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
        <section className="flex flex-col gap-4 rounded-sm border border-strong bg-surface p-5">
            <SectionLabel aside={t('próximo na trilha')}>
                {t('tópico atual')}
            </SectionLabel>
            <div className="flex flex-col gap-2">
                <p className="font-mono text-sm text-muted">
                    {t('nenhum tópico em estudo')}
                </p>
                <p className="text-secondary">
                    {t('Você concluiu :topic. O próximo na trilha é:', {
                        topic: completedTopicTitle,
                    })}
                </p>
            </div>
            <NextTopicCard topic={nextTopic} />
            <p className="font-mono text-xs text-muted">
                {t('Concluir um tópico agenda as revisões de 7 e 30 dias.')}
            </p>
        </section>
    );
}
