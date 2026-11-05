import { useState } from 'react';
import type { TopicDetail } from '@/lib/sample/topic';
import type { TopicStatus } from '@/types/topic';

function withToggledIndex(indexes: Set<number>, index: number): Set<number> {
    const next = new Set(indexes);
    if (next.has(index)) {
        next.delete(index);
    } else {
        next.add(index);
    }
    return next;
}

export function useTopicState(topic: TopicDetail) {
    const [status, setStatus] = useState<TopicStatus>(topic.status);
    const [checkedItems, setCheckedItems] = useState(
        () => new Set(topic.checked_items),
    );
    const [notes, setNotes] = useState(topic.notes);

    return {
        status,
        setStatus,
        checkedItems,
        toggleItem: (index: number) =>
            setCheckedItems((items) => withToggledIndex(items, index)),
        notes,
        setNotes,
    };
}

export type TopicState = ReturnType<typeof useTopicState>;
