import { Link } from '@inertiajs/react';
import { HomeStep } from '@/components/home/home-step';
import type { ReviewItem } from '@/components/home/types';
import { ButtonLink } from '@/components/ui/button';
import { useChrome } from '@/hooks/use-chrome';
import { useTranslation } from '@/hooks/use-translation';

const REVIEWS_ROUTE = '/reviews';

export function ReviewsStep({
    reviews,
    dueCount,
}: {
    reviews: ReviewItem[];
    dueCount: number;
}) {
    const { t } = useTranslation();
    const { reviewsDue } = useChrome();
    const dueInOtherRoadmaps = reviewsDue - dueCount;

    return (
        <HomeStep
            number={1}
            title={t('revisões de hoje · :count neste roadmap', {
                count: dueCount,
            })}
        >
            {reviews.length === 0 ? (
                <p className="text-secondary">
                    {t('Nenhuma revisão para hoje neste roadmap.')}
                </p>
            ) : (
                <ul className="flex flex-col">
                    {reviews.map((review) => (
                        <li key={review.id} className="border-t border-border">
                            <Link
                                href={REVIEWS_ROUTE}
                                className="flex items-baseline gap-2.5 py-2 hover:bg-active/60"
                            >
                                <span
                                    aria-hidden="true"
                                    className="text-xs text-review"
                                >
                                    ◆
                                </span>
                                <span className="min-w-0 flex-1 truncate text-sm font-medium text-text">
                                    {review.title}{' '}
                                    <span className="font-mono text-xs font-normal text-muted">
                                        {review.area}
                                    </span>
                                </span>
                                <span className="font-mono text-xs text-review">
                                    {review.dueIn}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
            <div className="flex flex-wrap items-center justify-between gap-3">
                {dueCount > 0 && (
                    <ButtonLink href={REVIEWS_ROUTE}>
                        {t('Revisar agora')}
                    </ButtonLink>
                )}
                {dueInOtherRoadmaps > 0 && (
                    <span className="font-mono text-xs text-muted">
                        {t('mais :count em outros roadmaps', {
                            count: dueInOtherRoadmaps,
                        })}
                    </span>
                )}
            </div>
        </HomeStep>
    );
}
