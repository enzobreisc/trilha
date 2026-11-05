import { useId, type Ref } from 'react';
import type { ManagedRoadmap } from '@/components/manage-roadmap/types';
import { FIELD_CAPTION_CLASSES } from '@/components/session/field-caption';
import { useTranslation } from '@/hooks/use-translation';

export function RoadmapIdentityFields({
    roadmap,
    name,
    nameInputRef,
    onNameChange,
}: {
    roadmap: ManagedRoadmap;
    name: string;
    nameInputRef: Ref<HTMLInputElement>;
    onNameChange: (name: string) => void;
}) {
    const { t, plural, shortDate } = useTranslation();
    const nameId = useId();

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
                <label htmlFor={nameId} className={FIELD_CAPTION_CLASSES}>
                    {t('nome')}
                </label>
                <input
                    id={nameId}
                    ref={nameInputRef}
                    value={name}
                    onChange={(event) => onNameChange(event.target.value)}
                    className="h-11 w-full rounded-full bg-surface px-4 text-sm font-semibold text-text inset-ring inset-ring-border focus:inset-ring-accent"
                />
            </div>
            <div className="flex flex-col gap-2">
                <span className={FIELD_CAPTION_CLASSES}>{t('chave')}</span>
                <span className="flex h-11 items-center rounded-full bg-surface px-4 font-mono text-sm text-muted inset-ring inset-ring-border">
                    {roadmap.key}
                </span>
                <span className="text-xs text-faint">
                    {t(
                        'Vem do arquivo .json e liga seu progresso aos tópicos. Não muda.',
                    )}
                </span>
            </div>
            <p className="text-xs leading-5 text-faint">
                {t(
                    'origem: :file, importado em :date · :done de :total tópicos concluídos · :sessions · :notes',
                    {
                        file: roadmap.originFile,
                        date: shortDate(roadmap.importedAt),
                        done: roadmap.completedTopics,
                        total: roadmap.totalTopics,
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
        </div>
    );
}
