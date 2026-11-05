import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

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
        <div className="flex flex-wrap gap-x-9 gap-y-3">
            <ReviewStat
                value={totalCount}
                label={t('para hoje')}
                isHighlighted
            />
            <ReviewStat value={answeredCount} label={t('feitas')} />
            <ReviewStat value={pendingCount} label={t('pendentes')} />
            <ReviewStat value={dueNextWeek} label={t('próx. 7 dias')} />
        </div>
    );
}

function ReviewStat({
    value,
    label,
    isHighlighted = false,
}: {
    value: number;
    label: string;
    isHighlighted?: boolean;
}) {
    return (
        <div className="flex items-baseline gap-2">
            <span
                className={cn(
                    'text-3xl font-semibold',
                    isHighlighted ? 'text-review' : 'text-text',
                )}
            >
                {value}
            </span>
            <span className="text-sm text-secondary">{label}</span>
        </div>
    );
}
