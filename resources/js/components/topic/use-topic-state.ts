import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import type { TopicDetail } from '@/components/topic/types';
import type { TopicStatus } from '@/types/topic';

const NOTES_SAVE_DELAY_MS = 700;

function withToggledIndex(indexes: number[], index: number): number[] {
    return indexes.includes(index)
        ? indexes.filter((current) => current !== index)
        : [...indexes, index];
}

export function useTopicState(topic: TopicDetail) {
    const [notes, setNotes] = useState(topic.notes);
    const isNotesSaved = notes === topic.notes;

    function save(changes: Record<string, string | boolean | number[]>) {
        router.patch(topic.updateUrl, changes, {
            preserveScroll: true,
            preserveState: true,
        });
    }

    useEffect(() => {
        if (isNotesSaved) {
            return;
        }
        const timeout = setTimeout(
            () =>
                router.patch(
                    topic.updateUrl,
                    { notes },
                    { preserveScroll: true, preserveState: true },
                ),
            NOTES_SAVE_DELAY_MS,
        );

        return () => clearTimeout(timeout);
    }, [notes, isNotesSaved, topic.updateUrl]);

    return {
        status: topic.status,
        setStatus: (status: TopicStatus) => save({ status }),
        checkedItems: new Set(topic.checkedItems),
        toggleItem: (index: number) =>
            save({
                checkedItems: withToggledIndex(topic.checkedItems, index),
            }),
        isExerciseCompleted: topic.exercise?.completedOn != null,
        toggleExercise: () =>
            save({ isExerciseCompleted: topic.exercise?.completedOn == null }),
        notes,
        setNotes,
        isNotesSaved,
    };
}

export type TopicState = ReturnType<typeof useTopicState>;
