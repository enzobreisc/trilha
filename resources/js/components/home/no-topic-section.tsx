import { HomeStep } from '@/components/home/home-step';
import { NextTopicCard } from '@/components/home/next-topic-card';
import type { TopicSummary } from '@/components/home/types';
import { ButtonLink } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';

export function NoTopicSection({
    completedTopicTitle,
    nextTopic,
}: {
    completedTopicTitle: string | null;
    nextTopic: TopicSummary | null;
}) {
    const { t } = useTranslation();

    return (
        <HomeStep number={2} title={t('escolher o próximo tópico')}>
            <p className="text-secondary">
                {nextTopic === null
                    ? t('Todos os tópicos desta trilha foram concluídos.')
                    : completedTopicTitle === null
                      ? t('Escolha o primeiro tópico da trilha para começar:')
                      : t('Você concluiu :topic. O próximo na trilha é:', {
                            topic: completedTopicTitle,
                        })}
            </p>
            {nextTopic ? (
                <NextTopicCard topic={nextTopic} />
            ) : (
                <div>
                    <ButtonLink href="/reviews" variant="secondary">
                        {t('Ver revisões')}
                    </ButtonLink>
                </div>
            )}
            <p className="font-mono text-xs text-muted">
                {t('Concluir um tópico agenda as revisões de 7 e 30 dias.')}
            </p>
        </HomeStep>
    );
}
