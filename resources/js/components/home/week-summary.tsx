import { Link } from '@inertiajs/react';
import type { HomeStats } from '@/components/home/types';
import { formatSessionDuration } from '@/components/session/session-draft';
import { useTranslation } from '@/hooks/use-translation';

const SESSIONS_ROUTE = '/sessions';

export function WeekSummary({ stats }: { stats: HomeStats }) {
    const { t, shortDate } = useTranslation();
    const figures = [
        {
            label: t('tempo estudado'),
            value: formatSessionDuration(stats.weekMinutes),
        },
        { label: t('sessões'), value: stats.weekSessionCount },
        { label: t('tópicos concluídos'), value: stats.weekCompletedTopics },
        { label: t('dias seguidos'), value: stats.streakDays },
    ];

    return (
        <section
            aria-label={t('esta semana')}
            className="flex flex-wrap items-end justify-between gap-x-10 gap-y-3"
        >
            <dl className="flex flex-wrap gap-x-11 gap-y-3">
                {figures.map((figure) => (
                    <div key={figure.label} className="flex flex-col gap-0.5">
                        <dd className="order-1 text-xl leading-[26px] font-semibold">
                            {figure.value}
                        </dd>
                        <dt className="order-2 font-mono text-[11px] text-muted">
                            {figure.label}
                        </dt>
                    </div>
                ))}
            </dl>
            <Link
                href={SESSIONS_ROUTE}
                className="font-mono text-xs text-accent hover:text-text"
            >
                {t('esta semana, :start – :end · ver sessões →', {
                    start: shortDate(stats.weekStart),
                    end: shortDate(stats.weekEnd),
                })}
            </Link>
        </section>
    );
}
