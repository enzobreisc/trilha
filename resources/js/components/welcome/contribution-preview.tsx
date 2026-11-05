import { ContributionHeatmap } from '@/components/start/contribution-heatmap';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import { sampleEmptyContributionLevels } from '@/lib/sample/welcome';

export function ContributionPreview() {
    const { t } = useTranslation();

    return (
        <Card title={t('contribuições')} aside={t('6 meses')}>
            <ContributionHeatmap
                levels={sampleEmptyContributionLevels}
                label={t('Gráfico de contribuições vazio')}
            />
            <p className="text-sm font-medium text-muted">
                {t(
                    'seu gráfico de contribuições começa no primeiro dia de estudo',
                )}
            </p>
        </Card>
    );
}
