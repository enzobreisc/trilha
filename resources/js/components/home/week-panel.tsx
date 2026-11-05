import { Link } from '@inertiajs/react';
import type { HomeStats } from '@/components/home/types';
import { Card } from '@/components/ui/card';
import { DataRow } from '@/components/ui/data-row';
import { useTranslation } from '@/hooks/use-translation';

const SESSIONS_ROUTE = '/sessions';

export function WeekPanel({ stats }: { stats: HomeStats }) {
    const { t } = useTranslation();

    return (
        <Card title={t('esta semana')} aside={stats.weekLabel}>
            <div className="flex flex-col gap-1">
                <span className="font-display text-5xl leading-none font-bold tracking-tighter text-text">
                    {stats.weekStudyTime}
                </span>
                <span className="text-sm font-medium text-muted">
                    {t('tempo estudado')}
                </span>
            </div>
            <div className="flex flex-col">
                <DataRow
                    label={t('sessões')}
                    value={
                        <span className="font-mono">
                            {stats.weekSessionCount}
                        </span>
                    }
                />
                <DataRow
                    label={t('tópicos concluídos')}
                    value={
                        <span className="font-mono">
                            {stats.weekCompletedTopics}
                        </span>
                    }
                />
                <DataRow
                    label={t('dias seguidos')}
                    value={
                        <span className="font-mono text-accent">
                            {stats.streakDays}
                        </span>
                    }
                />
            </div>
            <Link
                href={SESSIONS_ROUTE}
                className="border-t border-border pt-4 text-sm font-semibold text-link hover:text-text"
            >
                {t('ver sessões →')}
            </Link>
        </Card>
    );
}
