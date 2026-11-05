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
            aside={`${item.roadmapId} · ${item.path} · ${item.interval}`}
            className="inset-ring-primary"
        >
            <div className="flex flex-col gap-3">
                <h3 className="text-[26px] leading-tight font-semibold tracking-tight">
                    {item.title}
                </h3>
                <p className="max-w-2xl text-secondary">{item.summary}</p>
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
            <div className="flex flex-wrap items-center gap-3 border-t border-border pt-4">
                <Button onClick={() => onMark('ok')}>{t('Lembrei bem')}</Button>
                <Button variant="secondary" onClick={() => onMark('again')}>
                    {t('Preciso rever')}
                </Button>
                <ButtonLink
                    href={`/topics/${item.id}`}
                    variant="ghost"
                    className="ml-auto"
                >
                    {t('abrir tópico →')}
                </ButtonLink>
            </div>
            <p className="font-mono text-xs text-muted">
                {t(REVIEW_HINT_COPY)}
            </p>
        </Card>
    );
}
