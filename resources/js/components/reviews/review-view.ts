import type { ReviewItem, ReviewOutcome, ReviewResults } from './types';

export type ReviewView = 'due' | 'finished' | 'empty';

export function deriveReviewView(
    items: ReviewItem[],
    results: ReviewResults,
): ReviewView {
    if (items.length === 0) {
        return 'empty';
    }

    return countPending(items, results) === 0 ? 'finished' : 'due';
}

export function countPending(
    items: ReviewItem[],
    results: ReviewResults,
): number {
    return items.filter((item) => !results[item.id]).length;
}

export function countOutcome(
    items: ReviewItem[],
    results: ReviewResults,
    outcome: ReviewOutcome,
): number {
    return items.filter((item) => results[item.id] === outcome).length;
}
