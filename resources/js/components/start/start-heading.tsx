import { PageHeader } from '@/components/ui/page-header';
import { useTranslation } from '@/hooks/use-translation';

export function StartHeading({
    today,
    profileName,
}: {
    today: string;
    profileName: string;
}) {
    const { t, shortDate, weekdayShort } = useTranslation();
    const weekdayIndex = new Date(`${today}T00:00:00Z`).getUTCDay();

    return (
        <PageHeader
            title={t('Boa noite, :name', { name: profileName })}
            description={t('O que você vai estudar agora?')}
            actions={
                <span className="text-sm font-medium text-muted">
                    {weekdayShort(weekdayIndex)}, {shortDate(today)}
                </span>
            }
        />
    );
}
