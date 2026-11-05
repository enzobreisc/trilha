import type { TopicLogEntry, TopicLogKind } from '@/components/home/types';
import { Section } from '@/components/start/section';
import { useTranslation } from '@/hooks/use-translation';
import type { TranslationKey } from '@/lib/i18n';

const KIND_LABEL_KEYS: Record<TopicLogKind, TranslationKey> = {
    session: 'sessão',
    exercise: 'exercício',
    comparison: 'comparação',
};

export function TopicHistory({ entries }: { entries: TopicLogEntry[] }) {
    const { t } = useTranslation();

    return (
        <Section title={t('histórico do tópico')}>
            <ol className="flex flex-col">
                {entries.map((entry, index) => (
                    <li
                        key={`${entry.when}-${index}`}
                        className="flex items-baseline gap-4 border-b border-border py-2.5 text-sm last:border-b-0"
                    >
                        <span className="w-20 shrink-0 font-mono text-xs text-muted">
                            {entry.when}
                        </span>
                        <span className="flex min-w-0 items-baseline gap-3">
                            <span className="font-semibold text-accent">
                                {t(KIND_LABEL_KEYS[entry.kind])}
                            </span>
                            <span className="truncate text-secondary">
                                {entry.detail}
                            </span>
                        </span>
                    </li>
                ))}
            </ol>
        </Section>
    );
}
