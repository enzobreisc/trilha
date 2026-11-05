import { Link } from '@inertiajs/react';
import type { HomeStats } from '@/components/home/types';
import { Section } from '@/components/start/section';
import { DataRow } from '@/components/ui/data-row';
import { useTranslation } from '@/hooks/use-translation';

const SESSIONS_ROUTE = '/sessions';

export function WeekPanel({ stats }: { stats: HomeStats }) {
    const { t } = useTranslation();

    return (
        <Section title={t('esta semana')} aside={stats.weekLabel}>
            <div className="flex flex-col gap-1.5">
                <DataRow
                    label={t('tempo estudado')}
                    value={stats.weekStudyTime}
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
