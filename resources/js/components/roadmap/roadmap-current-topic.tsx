import type { RoadmapSectionData } from '@/components/roadmap/types';
import { allTopicsOf } from '@/components/roadmap/roadmap-progress';
import { StatusIcon } from '@/components/status-icon';
import { ButtonLink } from '@/components/ui/button';
import { SectionLabel } from '@/components/ui/section-label';
import { useTranslation } from '@/hooks/use-translation';

export function RoadmapCurrentTopic({
    sections,
}: {
    sections: RoadmapSectionData[];
}) {
    const { t } = useTranslation();
    const topics = allTopicsOf(sections);
    const studyingTopic = topics.find((topic) => topic.status === 'studying');
    const nextTopic = topics.find((topic) => topic.status === 'todo');
    const focusTopic = studyingTopic ?? nextTopic;

    if (focusTopic === undefined) {
        return null;
    }

    const followingTopic = studyingTopic !== undefined ? nextTopic : undefined;

    return (
        <section className="flex flex-wrap items-center justify-between gap-x-5 gap-y-3 rounded-sm border border-strong bg-surface px-4.5 py-3.5">
            <div className="flex min-w-0 flex-col gap-1">
                <SectionLabel>
                    {studyingTopic
                        ? t('você está aqui')
                        : t('próximo na trilha')}
                </SectionLabel>
                <p className="flex items-center gap-2.5 text-[17px] font-semibold">
                    <StatusIcon status={focusTopic.status} size={14} />
                    {focusTopic.title}
                </p>
                {followingTopic && (
                    <p className="font-mono text-xs text-muted">
                        {t('depois: :topic', { topic: followingTopic.title })}
                    </p>
                )}
            </div>
            <ButtonLink href={focusTopic.href}>
                {studyingTopic ? t('Continuar') : t('Começar este tópico')}
            </ButtonLink>
        </section>
    );
}
