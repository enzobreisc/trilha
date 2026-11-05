import {
    formatDuration,
    getTotalMinutes,
} from '@/components/topic/session-time';
import { TopicSection } from '@/components/topic/topic-section';
import { Button } from '@/components/ui/button';
import { DataRow } from '@/components/ui/data-row';
import { useTranslation } from '@/hooks/use-translation';
import type { TopicSession } from '@/lib/sample/topic';

export function SessionSummarySection({
    sessions,
    onRegister,
}: {
    sessions: TopicSession[];
    onRegister: () => void;
}) {
    const { t, plural } = useTranslation();
    const [lastSession] = sessions;

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
                        day: lastSession.day,
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
