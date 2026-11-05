import { TopicChecklist } from '@/components/home/topic-checklist';
import { TopicHistory } from '@/components/home/topic-history';
import type { CurrentTopic } from '@/components/home/types';
import { TopicStatusIcon } from '@/components/home/topic-status-icon';
import { Button, ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
        <Card
            title={t('tópico atual')}
            aside={
                <span className="inline-flex items-center gap-2 rounded-full bg-active px-3 py-1 text-accent">
                    <TopicStatusIcon status="studying" className="size-3.5" />
                    {t('estudando')}
                </span>
            }
            className="bg-elevated inset-ring-strong"
        >
            <div className="flex flex-col gap-3">
                <p className="text-sm font-medium text-muted">
                    {roadmapName} / {topic.breadcrumb}
                </p>
                <h3 className="font-display text-3xl leading-tight font-bold tracking-tight text-text">
                    {topic.title}
                </h3>
                <p className="max-w-prose text-base text-secondary">
                    {topic.description}
                </p>
                <p className="text-sm font-medium text-faint">
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
        </Card>
    );
}
