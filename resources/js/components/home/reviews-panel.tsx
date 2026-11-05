import { Link } from '@inertiajs/react';
import type { ReviewItem } from '@/components/home/types';
import { Section } from '@/components/start/section';
import { useTranslation } from '@/hooks/use-translation';

const REVIEWS_ROUTE = '/reviews';

export function ReviewsPanel({ reviews }: { reviews: ReviewItem[] }) {
    const { t } = useTranslation();

    return (
        <Section
            title={t('revisões')}
            aside={<span className="text-review">{reviews.length}</span>}
        >
            <ul className="-mx-2 flex flex-col">
                {reviews.map((review) => (
                    <li key={review.id}>
                        <Link
                            href={REVIEWS_ROUTE}
                            className="flex items-baseline gap-2.5 rounded-xs px-2 py-1.5 hover:bg-active/60"
                        >
                            <span
                                aria-hidden="true"
                                className="text-xs text-review"
                            >
                                ◆
                            </span>
                            <span className="min-w-0 flex-1 truncate text-sm font-medium text-secondary">
                                {review.title}{' '}
                                <span className="font-mono text-xs text-muted">
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
            <Link
                href={REVIEWS_ROUTE}
                className="font-mono text-xs text-accent hover:text-text"
            >
                {t('revisar →')}
            </Link>
        </Section>
    );
}
