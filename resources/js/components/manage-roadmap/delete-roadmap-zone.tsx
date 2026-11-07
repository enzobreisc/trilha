import { router } from '@inertiajs/react';
import { useState, type KeyboardEvent } from 'react';
import {
    DANGER_FIELD_CONTROL_CLASSES,
    SECTION_CLASSES,
    SECTION_LABEL_CLASSES,
} from '@/components/manage-roadmap/dialog-styles';
import type { ManagedRoadmap } from '@/components/manage-roadmap/types';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';

export function DeleteRoadmapZone({ roadmap }: { roadmap: ManagedRoadmap }) {
    const { t, plural } = useTranslation();
    const [confirmation, setConfirmation] = useState('');
    const isConfirmed = confirmation === roadmap.slug;

    function preventFormSubmitOnEnter(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'Enter') {
            event.preventDefault();
        }
    }

    return (
        <section className={SECTION_CLASSES}>
            <span className={SECTION_LABEL_CLASSES}>
                {t('Excluir roadmap')}
            </span>
            <p className="text-sm leading-6 text-secondary">
                <span aria-hidden="true" className="text-danger">
                    !
                </span>{' '}
                {t(
                    'Apaga :topics, :sessions, :notes e as revisões agendadas. Não dá para desfazer. Considere exportar um backup antes.',
                    {
                        topics: plural(
                            roadmap.totalTopics,
                            'tópico',
                            'tópicos',
                        ),
                        sessions: plural(
                            roadmap.sessionCount,
                            'sessão',
                            'sessões',
                        ),
                        notes: plural(
                            roadmap.noteCount,
                            'anotação',
                            'anotações',
                        ),
                    },
                )}
            </p>
            <label className="flex flex-col gap-2">
                <span className={SECTION_LABEL_CLASSES}>
                    {t('digite o nome para confirmar')}
                </span>
                <input
                    value={confirmation}
                    placeholder={roadmap.slug}
                    onChange={(event) => setConfirmation(event.target.value)}
                    onKeyDown={preventFormSubmitOnEnter}
                    className={DANGER_FIELD_CONTROL_CLASSES}
                />
            </label>
            <div>
                <Button
                    variant="secondary"
                    disabled={!isConfirmed}
                    onClick={() =>
                        router.delete(`/roadmaps/${roadmap.id}`, {
                            data: { confirmation },
                        })
                    }
                    className="disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {t('Excluir para sempre')}
                </Button>
            </div>
        </section>
    );
}
