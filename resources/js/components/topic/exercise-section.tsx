import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import type { TopicExercise } from '@/lib/sample/topic';

const INLINE_CODE_DELIMITER = '`';

export function ExerciseSection({ exercise }: { exercise: TopicExercise }) {
    const { t } = useTranslation();

    return (
        <Card
            title={t('exercício sem IA')}
            aside={
                exercise.completed_on ? (
                    <span className="text-accent">
                        {t('feito em :date', { date: exercise.completed_on })}
                    </span>
                ) : undefined
            }
        >
            <p className="m-0 text-sm leading-7 font-medium text-secondary">
                {exercise.text
                    .split(INLINE_CODE_DELIMITER)
                    .map((segment, index) =>
                        index % 2 === 1 ? (
                            <code
                                key={index}
                                className="rounded-full bg-elevated px-2 py-0.5 font-mono text-xs text-text"
                            >
                                {segment}
                            </code>
                        ) : (
                            <span key={index}>{segment}</span>
                        ),
                    )}
            </p>
            <p className="m-0 text-xs text-faint">
                {t(
                    'Comparar com a versão da IA. Anote as diferenças nas anotações.',
                )}
            </p>
        </Card>
    );
}
