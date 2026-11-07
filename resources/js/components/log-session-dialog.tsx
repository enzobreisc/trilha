import { router } from '@inertiajs/react';
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
import {
    SESSION_ACTIVITY_OPTIONS,
    SESSION_DURATION_OPTIONS,
} from '@/components/session/options';
import { SessionDialogFooter } from '@/components/session/session-dialog-footer';
import {
    buildInitialDraft,
    resolveSessionDate,
    toTopicEntries,
    toggleActivity,
    type SessionToEdit,
} from '@/components/session/session-draft';
import type { SessionDraft } from '@/components/session/types';
import { TopicField } from '@/components/session/topic-field';
import { useModalDialog } from '@/components/session/use-modal-dialog';
import { useChrome, useToday } from '@/hooks/use-chrome';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

export type LogSessionDialogProps = {
    onClose: () => void;
    defaultTopicId?: string;
    session?: SessionToEdit;
};

export default function LogSessionDialog({
    onClose,
    defaultTopicId,
    session,
}: LogSessionDialogProps) {
    const { t } = useTranslation();
    const { topics, weekMinutes } = useChrome();
    const today = useToday();
    const titleId = useId();
    const topicRef = useRef<HTMLSelectElement>(null);
    const dialogRef = useModalDialog(topicRef);
    const topicEntries = toTopicEntries(topics);
    const [draft, setDraft] = useState<SessionDraft>(() =>
        buildInitialDraft({
            topics: topicEntries,
            today,
            requestedTopicId: defaultTopicId,
            session,
        }),
    );
    const [errorMessage, setErrorMessage] = useState<string>();
    const [isSubmitting, setIsSubmitting] = useState(false);

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
        const payload = {
            topicId: Number(draft.topicId),
            date: resolveSessionDate(draft, today),
            durationMinutes: draft.durationMinutes,
            activities: draft.activities,
            note: draft.note,
        };
        const options = {
            preserveScroll: true,
            onStart: () => setIsSubmitting(true),
            onFinish: () => setIsSubmitting(false),
            onSuccess: onClose,
            onError: (errors: Record<string, string>) =>
                setErrorMessage(Object.values(errors)[0]),
        };

        if (session) {
            router.put(`/sessions/${session.id}`, payload, options);
            return;
        }
        router.post('/sessions', payload, options);
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
                    title={session ? t('Editar sessão') : t('Registrar sessão')}
                    onClose={onClose}
                />
                <div className="flex flex-col gap-5 px-6 py-4">
                    <TopicField
                        ref={topicRef}
                        topics={topicEntries}
                        value={draft.topicId}
                        onChange={(topicId) => updateDraft({ topicId })}
                    />
                    <DayField
                        value={draft.day}
                        otherDate={draft.otherDate}
                        maxDate={today}
                        onChange={(day) => updateDraft({ day })}
                        onOtherDateChange={(otherDate) =>
                            updateDraft({ otherDate })
                        }
                    />
                    <DurationField
                        options={SESSION_DURATION_OPTIONS}
                        value={draft.durationMinutes}
                        onChange={(durationMinutes) =>
                            updateDraft({ durationMinutes })
                        }
                    />
                    <ActivityField
                        options={SESSION_ACTIVITY_OPTIONS}
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
                    weekMinutes={weekMinutes}
                    sessionMinutes={session ? 0 : draft.durationMinutes}
                    errorMessage={errorMessage}
                    isSubmitting={isSubmitting}
                    onCancel={onClose}
                />
            </form>
        </dialog>
    );
}
