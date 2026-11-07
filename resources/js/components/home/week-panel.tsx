import { Link } from '@inertiajs/react';
import type { HomeStats } from '@/components/home/types';
import { formatSessionDuration } from '@/components/session/session-draft';
import { Section } from '@/components/start/section';
import { DataRow } from '@/components/ui/data-row';
import { useTranslation } from '@/hooks/use-translation';

const SESSIONS_ROUTE = '/sessions';

export function WeekPanel({ stats }: { stats: HomeStats }) {
    const { t, shortDate } = useTranslation();

    return (
        <Section
            title={t('esta semana')}
            aside={`${shortDate(stats.weekStart)} – ${shortDate(stats.weekEnd)}`}
        >
            <div className="flex flex-col gap-1.5">
                <DataRow
                    label={t('tempo estudado')}
                    value={formatSessionDuration(stats.weekMinutes)}
                />
                <DataRow label={t('sessões')} value={stats.weekSessionCount} />
                <DataRow
                    label={t('tópicos concluídos')}
                    value={stats.weekCompletedTopics}
                />
                <DataRow
                    label={t('dias seguidos')}
                    value={
                        <span className="text-accent">{stats.streakDays}</span>
                    }
                />
            </div>
            <Link
                href={SESSIONS_ROUTE}
                className="font-mono text-xs text-accent hover:text-text"
            >
                {t('ver sessões →')}
            </Link>
        </Section>
    );
}
