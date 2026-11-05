import { ContributionGraph } from '@/components/contribution-graph';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import type { ContributionDay } from '@/types/contribution';

export function ContributionsPanel({ days }: { days: ContributionDay[] }) {
    const { t } = useTranslation();

    return (
        <Card title={t('contribuições')} aside={t('6 meses')}>
            <ContributionGraph days={days} />
        </Card>
    );
}
