import { useTranslation } from '@/hooks/use-translation';

export function RoadmapReviewStatus({
    reviewsDue,
    lastStudiedDaysAgo,
}: {
    reviewsDue: number;
    lastStudiedDaysAgo: number | null;
}) {
    const { t, plural, relativeDay } = useTranslation();

    return (
        <>
            {reviewsDue > 0 ? (
                <span className="inline-flex items-center gap-1.5 font-semibold text-review">
                    <span aria-hidden="true">◆</span>
                    {plural(reviewsDue, 'revisão', 'revisões')}
                </span>
            ) : (
                <span className="text-muted">{t('em dia')}</span>
            )}
            {lastStudiedDaysAgo !== null && (
                <span className="text-muted">
                    {relativeDay(lastStudiedDaysAgo)}
                </span>
            )}
        </>
    );
}
