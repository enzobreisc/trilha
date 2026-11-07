import { NextTopicCard } from '@/components/home/next-topic-card';
import type { TopicSummary } from '@/components/home/types';
import { ButtonLink } from '@/components/ui/button';
import { SectionLabel } from '@/components/ui/section-label';
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
        <section className="flex flex-col gap-4 rounded-sm border border-strong bg-surface p-5">
            <SectionLabel
                aside={nextTopic ? t('próximo na trilha') : undefined}
            >
                {t('tópico atual')}
            </SectionLabel>
            <div className="flex flex-col gap-2">
                <p className="font-mono text-sm text-muted">
                    {t('nenhum tópico em estudo')}
                </p>
                <p className="text-secondary">
                    {nextTopic === null
                        ? t('Todos os tópicos desta trilha foram concluídos.')
                        : completedTopicTitle === null
                          ? t(
                                'Escolha o primeiro tópico da trilha para começar:',
                            )
                          : t('Você concluiu :topic. O próximo na trilha é:', {
                                topic: completedTopicTitle,
                            })}
                </p>
            </div>
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
        </section>
    );
}
