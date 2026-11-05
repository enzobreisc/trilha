import { Link } from '@inertiajs/react';
import type { StartReview } from '@/components/start/types';

export function ReviewRow({ review }: { review: StartReview }) {
    return (
        <li>
            <Link
                href="/reviews"
                className="flex min-h-9 items-center gap-3 text-sm font-medium text-secondary hover:text-text"
            >
                <span
                    aria-hidden="true"
                    className="size-2 shrink-0 rounded-full bg-warn"
                />
                <span className="min-w-0 flex-1 truncate">
                    {review.title}
                    <span className="text-faint"> {review.roadmapTag}</span>
                </span>
                <span className="font-mono text-xs text-faint">
                    {review.intervalLabel}
                </span>
            </Link>
        </li>
    );
}
