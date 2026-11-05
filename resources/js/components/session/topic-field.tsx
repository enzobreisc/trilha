import { useId, type Ref } from 'react';
import { FIELD_CAPTION_CLASSES } from '@/components/session/field-caption';
import type { TopicEntry } from '@/components/session/types';
import { StatusIcon } from '@/components/status-icon';
import { ChevronDownIcon } from '@/components/ui/icons';
import { useTranslation } from '@/hooks/use-translation';

export function TopicField({
    ref,
    topics,
    value,
    onChange,
}: {
    ref: Ref<HTMLSelectElement>;
    topics: TopicEntry[];
    value: string;
    onChange: (topicKey: string) => void;
}) {
    const { t } = useTranslation();
    const selectId = useId();
    const selectedTopic = topics.find((topic) => topic.id === value);

    return (
        <div className="flex flex-col gap-2">
            <label htmlFor={selectId} className={FIELD_CAPTION_CLASSES}>
                {t('tópico')}
            </label>
            <div className="relative flex h-10 items-center rounded-sm px-3 text-sm inset-ring inset-ring-strong has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent">
                <div
                    aria-hidden="true"
                    className="pointer-events-none flex min-w-0 flex-1 items-center gap-2.5"
                >
                    {selectedTopic && (
                        <StatusIcon status={selectedTopic.status} />
                    )}
                    <span className="min-w-0 flex-1 truncate font-semibold text-text">
                        {selectedTopic?.title}
                    </span>
                    <span className="shrink-0 font-mono text-xs text-muted">
                        {selectedTopic?.path}
                    </span>
                </div>
                <ChevronDownIcon
                    width={16}
                    height={16}
                    className="pointer-events-none ml-2.5 shrink-0 text-muted"
                />
                <select
                    ref={ref}
                    id={selectId}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                >
                    {topics.map((topic) => (
                        <option key={topic.id} value={topic.id}>
                            {topic.title}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
