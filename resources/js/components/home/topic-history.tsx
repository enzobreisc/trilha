import type { TopicLogEntry, TopicLogKind } from '@/components/home/types';
import { SectionTitle } from '@/components/ui/page-header';
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
        <section className="flex flex-col gap-2">
            <SectionTitle>{t('histórico do tópico')}</SectionTitle>
            <ol className="flex flex-col">
                {entries.map((entry, index) => (
                    <li
                        key={`${entry.when}-${index}`}
                        className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-border py-3 last:border-b-0"
                    >
                        <span className="flex min-w-0 items-baseline gap-3">
                            <span className="text-sm font-semibold text-accent">
                                {t(KIND_LABEL_KEYS[entry.kind])}
                            </span>
                            <span className="truncate text-sm font-medium text-secondary">
                                {entry.detail}
                            </span>
                        </span>
                        <span className="text-xs font-medium text-faint">
                            {entry.when}
                        </span>
                    </li>
                ))}
            </ol>
        </section>
    );
}
