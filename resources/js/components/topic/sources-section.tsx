import { ExternalLinkIcon } from '@/components/topic/topic-icons';
import { TopicSection } from '@/components/topic/topic-section';
import { DataRow } from '@/components/ui/data-row';
import { useTranslation } from '@/hooks/use-translation';
import type { TopicSource } from '@/lib/sample/topic';

export function SourcesSection({ sources }: { sources: TopicSource[] }) {
    const { t } = useTranslation();

    return (
        <TopicSection title={t('fontes')}>
            <ul className="m-0 flex list-none flex-col gap-1 p-0">
                {sources.map((source) => (
                    <li key={source.url}>
                        <a
                            href={source.url}
                            target="_blank"
                            rel="noreferrer"
                            className="group block py-1"
                        >
                            <DataRow
                                label={
                                    <span className="group-hover:text-text">
                                        {source.title}
                                    </span>
                                }
                                value={
                                    <ExternalLinkIcon className="text-accent" />
                                }
                            />
                        </a>
                    </li>
                ))}
            </ul>
        </TopicSection>
    );
}
