import { HomeStep } from '@/components/home/home-step';
import type { CurrentTopic } from '@/components/home/types';
import { formatSessionDuration } from '@/components/session/session-draft';
import { SegmentedProgress } from '@/components/segmented-progress';
import { Button, ButtonLink } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';

export function ActiveTopicSection({
    topic,
    onRegisterSession,
}: {
    topic: CurrentTopic;
    onRegisterSession: () => void;
}) {
    const { t, plural, shortDate } = useTranslation();
    const doneCount = topic.checklist.filter((item) => item.isDone).length;
    const nextItem = topic.checklist.find((item) => !item.isDone);

    return (
        <HomeStep number={2} title={t('continuar estudando')}>
            <div className="flex flex-col gap-1.5">
                <p className="font-mono text-xs text-muted">
                    {topic.breadcrumb}
                </p>
                <h2 className="text-2xl leading-tight font-semibold tracking-tight text-text">
                    {topic.title}
                </h2>
                <p className="font-mono text-xs text-accent">
                    {t('estudando')} ·{' '}
                    {t('desde :date · :time em :sessions', {
                        date: topic.startedOn
                            ? shortDate(topic.startedOn)
                            : '—',
                        time: formatSessionDuration(topic.minutesSpent),
                        sessions: plural(
                            topic.sessionCount,
                            'sessão',
                            'sessões',
                        ),
                    })}
                </p>
            </div>
            {topic.checklist.length > 0 && (
                <div className="flex flex-col gap-2 rounded-sm border border-border bg-bg p-3.5">
                    <div className="flex items-center gap-3">
                        <SegmentedProgress
                            className="w-30"
                            filled={doneCount}
                            total={topic.checklist.length}
                        />
                        <span className="font-mono text-[11px] text-muted">
                            {t(':done/:total itens dominados', {
                                done: doneCount,
                                total: topic.checklist.length,
                            })}
                        </span>
                    </div>
                    {nextItem && (
                        <p className="text-sm text-text">
                            <span
                                aria-hidden="true"
                                className="mr-2.5 font-mono text-faint"
                            >
                                [ ]
                            </span>
                            {nextItem.label}
                        </p>
                    )}
                </div>
            )}
            <div className="flex flex-wrap gap-3">
                <Button onClick={onRegisterSession}>
                    {t('Registrar sessão')}
                </Button>
                <ButtonLink href={topic.href} variant="secondary">
                    {t('Abrir tópico')}
                </ButtonLink>
            </div>
        </HomeStep>
    );
}
