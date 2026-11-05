import {
    useId,
    useRef,
    useState,
    type FormEvent,
    type MouseEvent,
} from 'react';
import { ActivityField } from '@/components/session/activity-field';
import { DayField } from '@/components/session/day-field';
import { DialogHeader } from '@/components/session/dialog-header';
import {
    DIALOG_ELEMENT_CLASSES,
    DIALOG_SURFACE_CLASSES,
} from '@/components/session/dialog-classes';
import { DurationField } from '@/components/session/duration-field';
import { NoteField } from '@/components/session/note-field';
import { SessionDialogFooter } from '@/components/session/session-dialog-footer';
import {
    flattenTopics,
    resolveInitialTopicId,
    toggleActivity,
} from '@/components/session/session-draft';
import type { SessionDraft } from '@/components/session/types';
import { TopicField } from '@/components/session/topic-field';
import { useModalDialog } from '@/components/session/use-modal-dialog';
import { useTranslation } from '@/hooks/use-translation';
import {
    sampleSessionDraft,
    sampleWeekSessionMinutes,
    sessionActivityOptions,
    sessionDurationOptions,
} from '@/lib/sample/session';
import { sampleTopicTree } from '@/lib/sample-data';
import { cn } from '@/lib/utils';

export type LogSessionDialogProps = {
    open: boolean;
    onClose: () => void;
    defaultTopicKey?: string;
};

const TOPICS = flattenTopics(sampleTopicTree);

export default function LogSessionDialog({
    open,
    onClose,
    defaultTopicKey,
}: LogSessionDialogProps) {
    if (!open) {
        return null;
    }

    return (
        <SessionDialog onClose={onClose} defaultTopicKey={defaultTopicKey} />
    );
}

function SessionDialog({
    onClose,
    defaultTopicKey,
}: Omit<LogSessionDialogProps, 'open'>) {
    const { t } = useTranslation();
    const titleId = useId();
    const topicRef = useRef<HTMLSelectElement>(null);
    const dialogRef = useModalDialog(topicRef);
    const [draft, setDraft] = useState<SessionDraft>(() => ({
        ...sampleSessionDraft,
        topicKey: resolveInitialTopicId(TOPICS, defaultTopicKey),
    }));

    function updateDraft(changes: Partial<SessionDraft>) {
        setDraft((current) => ({ ...current, ...changes }));
    }

    function handleBackdropMouseDown(event: MouseEvent<HTMLDialogElement>) {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onClose();
    }

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby={titleId}
            onClose={onClose}
            onMouseDown={handleBackdropMouseDown}
            className={cn(DIALOG_ELEMENT_CLASSES, 'max-w-165')}
        >
            <form
                onSubmit={handleSubmit}
                className={cn(DIALOG_SURFACE_CLASSES, 'rounded-sm')}
            >
                <DialogHeader
                    titleId={titleId}
                    title={t('Registrar sessão')}
                    onClose={onClose}
                />
                <div className="flex flex-col gap-5 px-6 py-4">
                    <TopicField
                        ref={topicRef}
                        topics={TOPICS}
                        value={draft.topicKey}
                        onChange={(topicKey) => updateDraft({ topicKey })}
                    />
                    <DayField
                        value={draft.day}
                        onChange={(day) => updateDraft({ day })}
                    />
                    <DurationField
                        options={sessionDurationOptions}
                        value={draft.durationMinutes}
                        onChange={(durationMinutes) =>
                            updateDraft({ durationMinutes })
                        }
                    />
                    <ActivityField
                        options={sessionActivityOptions}
                        value={draft.activities}
                        onToggle={(activity) =>
                            updateDraft({
                                activities: toggleActivity(
                                    draft.activities,
                                    activity,
                                ),
                            })
                        }
                    />
                    <NoteField
                        value={draft.note}
                        onChange={(note) => updateDraft({ note })}
                    />
                </div>
                <SessionDialogFooter
                    weekMinutes={sampleWeekSessionMinutes}
                    sessionMinutes={draft.durationMinutes}
                    onCancel={onClose}
                />
            </form>
        </dialog>
    );
}
