import { Link } from '@inertiajs/react';
import type { ReviewItem } from '@/components/home/types';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';

const REVIEWS_ROUTE = '/reviews';

export function ReviewsPanel({ reviews }: { reviews: ReviewItem[] }) {
    const { t } = useTranslation();

    return (
        <Card title={t('revisões')}>
            <div className="flex flex-col gap-1">
                <span className="font-display text-5xl leading-none font-bold tracking-tighter text-warn">
                    {reviews.length}
                </span>
                <span className="text-sm font-medium text-muted">
                    {t(
                        reviews.length === 1
                            ? 'revisão vence hoje'
                            : 'revisões vencem hoje',
                    )}
                </span>
            </div>
            <ul className="-mx-2 flex flex-col">
                {reviews.map((review) => (
                    <li key={review.id}>
                        <Link
                            href={REVIEWS_ROUTE}
                            className="flex items-center gap-3 rounded-sm px-2 py-2.5 hover:bg-active/60"
                        >
                            <span
                                aria-hidden="true"
                                className="size-2 shrink-0 rounded-full bg-warn"
                            />
                            <span className="flex min-w-0 flex-1 flex-col">
                                <span className="truncate text-sm font-semibold text-secondary">
                                    {review.title}
                                </span>
                                <span className="text-xs font-medium text-faint">
                                    {review.area}
                                </span>
                            </span>
                            <span className="font-mono text-xs text-muted">
                                {review.dueIn}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
            <Link
                href={REVIEWS_ROUTE}
                className="border-t border-border pt-4 text-sm font-semibold text-link hover:text-text"
            >
                {t('revisar →')}
            </Link>
        </Card>
    );
}
