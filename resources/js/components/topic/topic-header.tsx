import { Fragment } from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { useTranslation } from '@/hooks/use-translation';
import type { TopicDetail } from '@/lib/sample/topic';

export function TopicHeader({ topic }: { topic: TopicDetail }) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-3">
            <nav
                aria-label={t('Caminho do tópico')}
                className="flex flex-wrap items-center gap-x-1.5 text-xs font-medium text-muted"
            >
                {topic.path.map((segment) => (
                    <Fragment key={segment}>
                        <span>{segment}</span>
                        <span aria-hidden="true">/</span>
                    </Fragment>
                ))}
                <span className="text-secondary">{topic.key}</span>
            </nav>
            <PageHeader title={topic.title} description={topic.summary} />
        </div>
    );
}
