import { Button, ButtonLink } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import { REVIEW_HINT_COPY, REVIEW_QUESTIONS } from './copy';
import { ReviewQuestion } from './review-question';
import type {
    ReviewAnswer,
    ReviewItem,
    ReviewOutcome,
    ReviewQuestionKey,
} from './types';

export function ReviewPanel({
    item,
    answer,
    onAnswer,
    onMark,
}: {
    item: ReviewItem;
    answer: ReviewAnswer;
    onAnswer: (key: ReviewQuestionKey, value: boolean) => void;
    onMark: (outcome: ReviewOutcome) => void;
}) {
    const { t } = useTranslation();

    return (
        <Card
            title={t('revisão')}
            className="bg-elevated p-8 inset-ring-strong"
        >
            <div className="flex flex-col gap-3">
                <span className="text-sm font-medium text-muted">
                    {`${item.roadmapId} · ${item.path} · ${item.interval}`}
                </span>
                <h3 className="font-display text-3xl leading-tight font-bold tracking-tight">
                    {item.title}
                </h3>
                <p className="max-w-2xl text-base text-secondary">
                    {item.summary}
                </p>
            </div>
            <div className="flex flex-col">
                {REVIEW_QUESTIONS.map((question) => (
                    <ReviewQuestion
                        key={question.key}
                        label={question.label}
                        value={answer[question.key]}
                        onChange={(value) => onAnswer(question.key, value)}
                    />
                ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 border-t border-border pt-5">
                <Button onClick={() => onMark('ok')}>{t('Lembrei bem')}</Button>
                <Button variant="secondary" onClick={() => onMark('again')}>
                    {t('Preciso rever')}
                </Button>
                <ButtonLink href={`/topics/${item.id}`} variant="ghost">
                    {t('abrir tópico →')}
                </ButtonLink>
            </div>
            <p className="text-sm font-medium text-faint">
                {t(REVIEW_HINT_COPY)}
            </p>
        </Card>
    );
}
