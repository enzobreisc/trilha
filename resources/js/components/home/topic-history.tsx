import type { TopicLogEntry } from '@/components/home/types';
import { SESSION_ACTIVITY_OPTIONS } from '@/components/session/options';
import { formatSessionDuration } from '@/components/session/session-draft';
import { Section } from '@/components/start/section';
import { useToday } from '@/hooks/use-chrome';
import { useTranslation } from '@/hooks/use-translation';
import { daysBetween } from '@/lib/dates';

const RELATIVE_DAYS_LIMIT = 1;
const DETAIL_SEPARATOR = ' · ';

export function TopicHistory({ entries }: { entries: TopicLogEntry[] }) {
    const { t, relativeDay, shortDate } = useTranslation();
    const today = useToday();

    function describe(entry: TopicLogEntry): string {
        const activityLabels = SESSION_ACTIVITY_OPTIONS.filter((option) =>
            entry.activities.includes(option.id),
        ).map((option) => t(option.label));
        const note = entry.note ? [entry.note] : [];

        return [
            formatSessionDuration(entry.minutes),
            ...activityLabels,
            ...note,
        ].join(DETAIL_SEPARATOR);
    }

    function dayLabel(date: string): string {
        const daysAgo = daysBetween(date, today);
        return daysAgo <= RELATIVE_DAYS_LIMIT
            ? relativeDay(daysAgo)
            : shortDate(date);
    }

    return (
        <Section title={t('histórico do tópico')}>
            <ol className="flex flex-col">
                {entries.map((entry, index) => (
                    <li
                        key={`${entry.date}-${entry.time}-${index}`}
                        className="flex items-baseline gap-4 border-b border-border py-2.5 text-sm last:border-b-0"
                    >
                        <span className="w-24 shrink-0 font-mono text-xs text-muted">
                            {dayLabel(entry.date)} {entry.time}
                        </span>
                        <span className="flex min-w-0 items-baseline gap-3">
                            <span className="font-semibold text-accent">
                                {t('sessão')}
                            </span>
                            <span className="truncate text-secondary">
                                {describe(entry)}
                            </span>
                        </span>
                    </li>
                ))}
            </ol>
        </Section>
    );
}
