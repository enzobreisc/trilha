import { router } from '@inertiajs/react';
import { useState } from 'react';
import type {
    ReviewAnswer,
    ReviewAnswers,
    ReviewItem,
    ReviewOutcome,
    ReviewQuestionKey,
    ReviewResults,
} from './types';

type ReviewMark = {
    itemId: string;
};

const REFRESHED_PROPS = ['chrome'];

function findNextPendingId(
    items: ReviewItem[],
    results: ReviewResults,
    currentId: string,
): string {
    const currentIndex = items.findIndex((item) => item.id === currentId);
    const isPending = (item: ReviewItem) => !results[item.id];
    const next =
        items.slice(currentIndex + 1).find(isPending) ?? items.find(isPending);
    return next?.id ?? currentId;
}

function withOutcome(
    results: ReviewResults,
    itemId: string,
    outcome: ReviewOutcome | undefined,
): ReviewResults {
    if (outcome) {
        return { ...results, [itemId]: outcome };
    }

    return Object.fromEntries(
        Object.entries(results).filter(([id]) => id !== itemId),
    );
}

export function useReviewSession(items: ReviewItem[]) {
    const [selectedId, setSelectedId] = useState<string | undefined>(
        items[0]?.id,
    );
    const [answers, setAnswers] = useState<ReviewAnswers>({});
    const [results, setResults] = useState<ReviewResults>({});
    const [marks, setMarks] = useState<ReviewMark[]>([]);

    const selectedItem =
        items.find((item) => item.id === selectedId) ?? items[0];
    const selectedAnswer: ReviewAnswer =
        (selectedItem && answers[selectedItem.id]) ?? {};

    function selectItem(id: string) {
        setSelectedId(id);
    }

    function answerQuestion(key: ReviewQuestionKey, value: boolean) {
        if (!selectedItem) {
            return;
        }
        setAnswers({
            ...answers,
            [selectedItem.id]: { ...selectedAnswer, [key]: value },
        });
    }

    function markReview(outcome: ReviewOutcome) {
        if (!selectedItem || results[selectedItem.id]) {
            return;
        }
        const nextResults = withOutcome(results, selectedItem.id, outcome);
        router.post(
            `/reviews/${selectedItem.id}/answer`,
            { outcome },
            {
                preserveState: true,
                preserveScroll: true,
                only: REFRESHED_PROPS,
            },
        );
        setMarks([...marks, { itemId: selectedItem.id }]);
        setResults(nextResults);
        setSelectedId(findNextPendingId(items, nextResults, selectedItem.id));
    }

    function undoLastMark() {
        const lastMark = marks[marks.length - 1];
        if (!lastMark) {
            return;
        }
        router.delete(`/reviews/${lastMark.itemId}/answer`, {
            preserveState: true,
            preserveScroll: true,
            only: REFRESHED_PROPS,
        });
        setMarks(marks.slice(0, -1));
        setResults(withOutcome(results, lastMark.itemId, undefined));
        setSelectedId(lastMark.itemId);
    }

    return {
        results,
        selectedItem,
        selectedAnswer,
        selectItem,
        answerQuestion,
        markReview,
        undoLastMark,
    };
}
