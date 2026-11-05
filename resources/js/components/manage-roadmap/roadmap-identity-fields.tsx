import { useId, type Ref } from 'react';
import {
    FIELD_CONTROL_CLASSES,
    SECTION_LABEL_CLASSES,
} from '@/components/manage-roadmap/dialog-styles';
import type { ManagedRoadmap } from '@/components/manage-roadmap/types';
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
                <label htmlFor={nameId} className={SECTION_LABEL_CLASSES}>
                    {t('nome')}
                </label>
                <input
                    id={nameId}
                    ref={nameInputRef}
                    value={name}
                    onChange={(event) => onNameChange(event.target.value)}
                    className={FIELD_CONTROL_CLASSES}
                />
            </div>
            <div className="flex flex-col gap-2">
                <span className={SECTION_LABEL_CLASSES}>{t('chave')}</span>
                <span className="flex h-9 items-center rounded-sm bg-surface px-3 font-mono text-sm text-muted inset-ring inset-ring-border">
                    {roadmap.key}
                </span>
                <span className="text-xs text-faint">
                    {t(
                        'Vem do arquivo .json e liga seu progresso aos tópicos. Não muda.',
                    )}
                </span>
            </div>
            <p className="text-xs leading-5 text-muted">
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
