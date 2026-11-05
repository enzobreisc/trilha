import type { TopicSummary } from '@/components/home/types';
import { TopicStatusIcon } from '@/components/home/topic-status-icon';
import { ButtonLink } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';

const ROADMAP_ROUTE = '/roadmap';

export function NextTopicCard({ topic }: { topic: TopicSummary }) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-3 rounded-sm border border-dashed border-accent p-4">
            <span className="font-mono text-xs text-muted">
                {topic.breadcrumb}
            </span>
            <div className="flex items-center gap-3">
                <TopicStatusIcon
                    status="todo"
                    className="size-3.5 shrink-0 text-faint"
                />
                <h3 className="font-mono text-base font-bold text-text">
                    {topic.title}
                </h3>
            </div>
            <p className="text-secondary">{topic.description}</p>
            <div className="flex flex-wrap gap-3 pt-1">
                <ButtonLink href={topic.href}>
                    {t('Começar este tópico')}
                </ButtonLink>
                <ButtonLink href={ROADMAP_ROUTE} variant="secondary">
                    {t('Escolher outro na trilha')}
                </ButtonLink>
            </div>
        </div>
    );
}
