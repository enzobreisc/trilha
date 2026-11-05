import { ContributionHeatmap } from '@/components/start/contribution-heatmap';
import type { StartStats } from '@/components/start/types';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import type { HeatLevel } from '@/types/contribution';

export function ContributionsSection({
    levels,
    stats,
}: {
    levels: HeatLevel[];
    stats: StartStats;
}) {
    const { t } = useTranslation();

    return (
        <Card title={t('contribuições')} aside={t('6 meses')}>
            <ContributionHeatmap
                levels={levels}
                label={t('Gráfico de contribuições: dias estudados')}
            />
            <div className="flex justify-between text-sm font-medium text-muted">
                <span>
                    <span className="font-mono font-semibold text-accent">
                        {stats.streakDays}
                    </span>{' '}
                    {t('dias seguidos')}
                </span>
                <span>
                    <span className="font-mono font-semibold text-text">
                        {stats.sessionCount}
                    </span>{' '}
                    {t('sessões')}
                </span>
            </div>
        </Card>
    );
}
