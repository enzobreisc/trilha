import {
    formatDuration,
    getTotalMinutes,
} from '@/components/topic/session-time';
import { TopicSection } from '@/components/topic/topic-section';
import type { TopicSession } from '@/components/topic/types';
import { Button } from '@/components/ui/button';
import { DataRow } from '@/components/ui/data-row';
import { useToday } from '@/hooks/use-chrome';
import { useTranslation } from '@/hooks/use-translation';
import { daysBetween } from '@/lib/dates';

const RELATIVE_DAYS_LIMIT = 1;

export function SessionSummarySection({
    sessions,
    onRegister,
}: {
    sessions: TopicSession[];
    onRegister: () => void;
}) {
    const { t, plural, relativeDay, shortDate } = useTranslation();
    const today = useToday();
    const [lastSession] = sessions;
    const daysAgo = lastSession ? daysBetween(lastSession.date, today) : 0;

    return (
        <TopicSection
            title={t('sessões')}
            aside={plural(sessions.length, 'sessão', 'sessões')}
        >
            <p className="m-0 text-[26px] leading-none font-semibold tracking-tight">
                {formatDuration(getTotalMinutes(sessions))}
            </p>
            {lastSession && (
                <DataRow
                    label={t('última')}
                    value={t(':day, :duration', {
                        day:
                            daysAgo <= RELATIVE_DAYS_LIMIT
                                ? relativeDay(daysAgo)
                                : shortDate(lastSession.date),
                        duration: formatDuration(lastSession.minutes),
                    })}
                />
            )}
            <Button className="self-start" onClick={onRegister}>
                {t('Registrar sessão')}
            </Button>
        </TopicSection>
    );
}
