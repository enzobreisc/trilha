import { formatSessionDuration } from '@/components/session/session-draft';
import { SessionStat } from '@/components/sessions/session-stat';
import { useTranslation } from '@/hooks/use-translation';

export function SessionsSummary({
    weekMinutes,
    totalSessions,
    streakDays,
}: {
    weekMinutes: number;
    totalSessions: number;
    streakDays: number;
}) {
    const { t } = useTranslation();

    return (
        <div className="grid gap-4 sm:grid-cols-3">
            <SessionStat
                value={formatSessionDuration(weekMinutes)}
                caption={t('esta semana')}
            />
            <SessionStat
                value={String(totalSessions)}
                caption={t('em 6 meses')}
            />
            <SessionStat
                value={String(streakDays)}
                caption={t('dias seguidos')}
            />
        </div>
    );
}
