import { useKeyShortcut } from '@/hooks/use-key-shortcut';
import { REVIEW_QUESTIONS } from './copy';
import type { ReviewAnswer, ReviewOutcome, ReviewQuestionKey } from './types';

export function useReviewHotkeys({
    isEnabled,
    answer,
    onAnswer,
    onMark,
}: {
    isEnabled: boolean;
    answer: ReviewAnswer;
    onAnswer: (key: ReviewQuestionKey, value: boolean) => void;
    onMark: (outcome: ReviewOutcome) => void;
}) {
    const nextQuestion = REVIEW_QUESTIONS.find(
        (question) => answer[question.key] === undefined,
    );

    useKeyShortcut(
        'y',
        () => nextQuestion && onAnswer(nextQuestion.key, true),
        isEnabled,
    );
    useKeyShortcut(
        'n',
        () => nextQuestion && onAnswer(nextQuestion.key, false),
        isEnabled,
    );
    useKeyShortcut('l', () => onMark('ok'), isEnabled);
    useKeyShortcut('p', () => onMark('again'), isEnabled);
}
