import { formatSessionDuration } from '@/components/session/session-draft';
import { Card } from '@/components/ui/card';
import { DataRow } from '@/components/ui/data-row';
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
        <Card title={t('resumo')}>
            <DataRow
                label={t('esta semana')}
                value={formatSessionDuration(weekMinutes)}
            />
            <DataRow label={t('em 6 meses')} value={totalSessions} />
            <DataRow label={t('dias seguidos')} value={streakDays} />
        </Card>
    );
}
