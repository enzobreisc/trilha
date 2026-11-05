import { Link } from '@inertiajs/react';
import { ReviewRow } from '@/components/start/review-row';
import type { StartReview } from '@/components/start/types';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';

export function ReviewsSection({ reviews }: { reviews: StartReview[] }) {
    const { t } = useTranslation();

    return (
        <Card title={t('revisões')} aside={`${reviews.length} ${t('hoje')}`}>
            <ul className="flex flex-col gap-1">
                {reviews.map((review) => (
                    <ReviewRow key={review.id} review={review} />
                ))}
            </ul>
            <Link
                href="/reviews"
                className="border-t border-border pt-3 text-sm font-semibold text-link hover:text-text"
            >
                {t('revisar todas')} →
            </Link>
        </Card>
    );
}
