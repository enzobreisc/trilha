import { TopicChecklist } from '@/components/home/topic-checklist';
import { TopicHistory } from '@/components/home/topic-history';
import type { CurrentTopic } from '@/components/home/types';
import { Button, ButtonLink } from '@/components/ui/button';
import { SectionLabel } from '@/components/ui/section-label';
import { useTranslation } from '@/hooks/use-translation';

export function ActiveTopicSection({
    roadmapName,
    topic,
    onRegisterSession,
}: {
    roadmapName: string;
    topic: CurrentTopic;
    onRegisterSession: () => void;
}) {
    const { t, plural } = useTranslation();

    return (
        <section className="flex flex-col gap-4 rounded-sm border border-strong bg-surface p-5">
            <SectionLabel>{t('tópico atual')}</SectionLabel>
            <div className="flex flex-col gap-2">
                <p className="font-mono text-xs text-muted">
                    {roadmapName} / {topic.breadcrumb}
                </p>
                <h2 className="text-2xl leading-tight font-semibold tracking-tight text-text">
                    {topic.title}
                </h2>
                <p className="font-mono text-xs text-accent">
                    {t('estudando')} ·{' '}
                    {t('desde :date · :time em :sessions', {
                        date: topic.startedOn,
                        time: topic.timeSpent,
                        sessions: plural(
                            topic.sessionCount,
                            'sessão',
                            'sessões',
                        ),
                    })}
                </p>
                <p className="max-w-prose pt-1 text-secondary">
                    {topic.description}
                </p>
            </div>
            <div className="flex flex-wrap gap-3">
                <Button onClick={onRegisterSession}>
                    {t('Registrar sessão')}
                </Button>
                <ButtonLink href={topic.href} variant="secondary">
                    {t('Abrir tópico')}
                </ButtonLink>
            </div>
            <TopicChecklist items={topic.checklist} />
            <TopicHistory entries={topic.history} />
        </section>
    );
}
