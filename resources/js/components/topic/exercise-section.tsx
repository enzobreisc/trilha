import { TopicSection } from '@/components/topic/topic-section';
import { useTranslation } from '@/hooks/use-translation';
import type { TopicExercise } from '@/lib/sample/topic';

const INLINE_CODE_DELIMITER = '`';

export function ExerciseSection({ exercise }: { exercise: TopicExercise }) {
    const { t } = useTranslation();

    return (
        <TopicSection
            title={t('exercício sem IA')}
            aside={
                exercise.completed_on ? (
                    <span className="text-accent">
                        {t('feito em :date', { date: exercise.completed_on })}
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
        </TopicSection>
    );
}
