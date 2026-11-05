import { Link } from '@inertiajs/react';
import type { StartReview } from '@/components/start/types';

export function ReviewRow({ review }: { review: StartReview }) {
    return (
        <li>
            <Link
                href="/reviews"
                className="flex items-baseline gap-2.5 py-1 text-sm font-medium text-secondary hover:text-text"
            >
                <span aria-hidden="true" className="text-xs text-review">
                    ◆
                </span>
                <span className="min-w-0 flex-1 truncate">
                    {review.title}
                    <span className="font-mono text-xs text-muted">
                        {' '}
                        {review.roadmapTag}
                    </span>
                </span>
                <span className="font-mono text-xs text-review">
                    {review.intervalLabel}
                </span>
            </Link>
        </li>
    );
}
