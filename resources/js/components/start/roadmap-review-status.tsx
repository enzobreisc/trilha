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
                <span className="inline-flex items-center gap-2 font-semibold text-warn">
                    <span
                        aria-hidden="true"
                        className="size-2 rounded-full bg-warn"
                    />
                    {plural(reviewsDue, 'revisão', 'revisões')}
                </span>
            ) : (
                <span className="text-faint">{t('em dia')}</span>
            )}
            {lastStudiedDaysAgo !== null && (
                <span className="text-faint">
                    {relativeDay(lastStudiedDaysAgo)}
                </span>
            )}
        </>
    );
}
