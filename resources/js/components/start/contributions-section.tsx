import { ContributionHeatmap } from '@/components/start/contribution-heatmap';
import { Section } from '@/components/start/section';
import type { StartStats } from '@/components/start/types';
import { DataRow } from '@/components/ui/data-row';
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
        <Section title={t('contribuições')} aside={t('6 meses')}>
            <div className="flex flex-col gap-1.5">
                <DataRow
                    label={t('dias seguidos')}
                    value={
                        <span className="text-accent">{stats.streakDays}</span>
                    }
                />
                <DataRow label={t('sessões')} value={stats.sessionCount} />
            </div>
            <ContributionHeatmap
                levels={levels}
                label={t('Gráfico de contribuições: dias estudados')}
            />
        </Section>
    );
}
