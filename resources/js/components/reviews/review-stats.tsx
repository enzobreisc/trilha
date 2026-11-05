import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';

export function ReviewStats({
    totalCount,
    answeredCount,
    pendingCount,
    dueNextWeek,
}: {
    totalCount: number;
    answeredCount: number;
    pendingCount: number;
    dueNextWeek: number;
}) {
    const { t } = useTranslation();

    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <ReviewStat value={totalCount} label={t('para hoje')} />
            <ReviewStat value={answeredCount} label={t('feitas')} />
            <ReviewStat value={pendingCount} label={t('pendentes')} />
            <ReviewStat value={dueNextWeek} label={t('próx. 7 dias')} />
        </div>
    );
}

function ReviewStat({ value, label }: { value: number; label: string }) {
    return (
        <Card className="gap-2 p-5">
            <span className="text-xs font-extrabold tracking-widest text-muted uppercase">
                {label}
            </span>
            <span className="font-display text-4xl leading-none font-bold">
                {value}
            </span>
        </Card>
    );
}
