import { useState, type KeyboardEvent } from 'react';
import type { ManagedRoadmap } from '@/components/manage-roadmap/types';
import { FIELD_CAPTION_CLASSES } from '@/components/session/field-caption';
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
        <div className="flex flex-col gap-4 rounded-md p-5 inset-ring inset-ring-danger-line">
            <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-danger">
                    {t('Excluir roadmap')}
                </span>
                <span className="text-xs leading-5 text-muted">
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
                </span>
            </div>
            <label className="flex flex-col gap-2">
                <span className={FIELD_CAPTION_CLASSES}>
                    {t('digite o nome para confirmar')}
                </span>
                <input
                    value={confirmation}
                    placeholder={roadmap.slug}
                    onChange={(event) => setConfirmation(event.target.value)}
                    onKeyDown={preventFormSubmitOnEnter}
                    className="h-11 w-full rounded-full bg-surface px-4 text-sm font-semibold text-text inset-ring inset-ring-border placeholder:text-faint focus:inset-ring-accent"
                />
            </label>
            <div>
                <Button
                    variant="secondary"
                    disabled={!isConfirmed}
                    className="disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {t('Excluir para sempre')}
                </Button>
            </div>
        </div>
    );
}
