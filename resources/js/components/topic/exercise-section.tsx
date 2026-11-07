import { TopicSection } from '@/components/topic/topic-section';
import type { TopicExercise } from '@/components/topic/types';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';

const INLINE_CODE_DELIMITER = '`';

export function ExerciseSection({
    exercise,
    onToggleCompleted,
}: {
    exercise: TopicExercise;
    onToggleCompleted: () => void;
}) {
    const { t, shortDate } = useTranslation();

    return (
        <TopicSection
            title={t('exercício sem IA')}
            aside={
                exercise.completedOn ? (
                    <span className="text-accent">
                        {t('feito em :date', {
                            date: shortDate(exercise.completedOn),
                        })}
                    </span>
                ) : undefined
            }
        >
            <p className="m-0 text-sm leading-7 text-secondary">
                {exercise.text
                    .split(INLINE_CODE_DELIMITER)
                    .map((segment, index) =>
                        index % 2 === 1 ? (
                            <code key={index} className="font-mono text-accent">
                                {segment}
                            </code>
                        ) : (
                            <span key={index}>{segment}</span>
                        ),
                    )}
            </p>
            <p className="m-0 font-mono text-xs text-muted">
                {t(
                    'Comparar com a versão da IA. Anote as diferenças nas anotações.',
                )}
            </p>
            <Button
                variant="secondary"
                className="self-start"
                onClick={onToggleCompleted}
            >
                {exercise.completedOn
                    ? t('Desmarcar como feito')
                    : t('Marcar como feito')}
            </Button>
        </TopicSection>
    );
}
