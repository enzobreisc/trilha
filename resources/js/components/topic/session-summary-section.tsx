import {
    formatDuration,
    getTotalMinutes,
} from '@/components/topic/session-time';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
        <Card
            title={t('sessões')}
            aside={plural(sessions.length, 'sessão', 'sessões')}
        >
            <p className="m-0 font-display text-5xl leading-none font-bold tracking-tighter">
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
            <Button className="w-full" onClick={onRegister}>
                {t('Registrar sessão')}
            </Button>
        </Card>
    );
}
