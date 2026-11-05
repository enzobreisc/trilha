import { ExternalLinkIcon } from '@/components/topic/topic-icons';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import type { TopicSource } from '@/lib/sample/topic';

export function SourcesSection({ sources }: { sources: TopicSource[] }) {
    const { t } = useTranslation();

    return (
        <Card title={t('fontes')}>
            <ul className="m-0 flex list-none flex-col gap-1 p-0">
                {sources.map((source) => (
                    <li key={source.url}>
                        <a
                            href={source.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-between gap-3 rounded-sm px-3 py-3 text-sm font-medium text-secondary transition-colors hover:bg-active/60 hover:text-text"
                        >
                            {source.title}
                            <ExternalLinkIcon className="shrink-0 text-muted" />
                        </a>
                    </li>
                ))}
            </ul>
        </Card>
    );
}
