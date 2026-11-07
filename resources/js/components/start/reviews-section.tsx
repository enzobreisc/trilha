import { Link } from '@inertiajs/react';
import { ReviewRow } from '@/components/start/review-row';
import { Section } from '@/components/start/section';
import type { StartReview } from '@/components/start/types';
import { useTranslation } from '@/hooks/use-translation';

export function ReviewsSection({
    reviews,
    dueCount,
}: {
    reviews: StartReview[];
    dueCount: number;
}) {
    const { t } = useTranslation();

    return (
        <Section
            title={t('revisões')}
            aside={
                <span className="text-review">
                    {dueCount} {t('hoje')}
                </span>
            }
        >
            <ul className="flex flex-col">
                {reviews.map((review) => (
                    <ReviewRow key={review.id} review={review} />
                ))}
            </ul>
            <Link
                href="/reviews"
                className="font-mono text-xs text-accent hover:text-text"
            >
                {t('revisar todas')} →
            </Link>
        </Section>
    );
}
