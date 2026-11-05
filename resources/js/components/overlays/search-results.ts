import type { SearchAction, SearchTopic } from '@/types/overlay';

const MAX_TOPIC_RESULTS = 8;

export type SearchResult =
    | (SearchTopic & { kind: 'topic' })
    | (SearchAction & { kind: 'action' });

export function normalizeSearchText(text: string): string {
    return text
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase();
}

export function findSearchResults(
    query: string,
    topics: SearchTopic[],
    actions: SearchAction[],
): SearchResult[] {
    const normalizedQuery = normalizeSearchText(query.trim());
    const matchingTopics = topics
        .filter((topic) =>
            normalizeSearchText(topic.title).includes(normalizedQuery),
        )
        .slice(0, MAX_TOPIC_RESULTS)
        .map((topic): SearchResult => ({ ...topic, kind: 'topic' }));
    const matchingActions = actions
        .filter((action) =>
            normalizeSearchText(action.label).includes(normalizedQuery),
        )
        .map((action): SearchResult => ({ ...action, kind: 'action' }));

    return [...matchingTopics, ...matchingActions];
}

export function cycleIndex(
    index: number,
    length: number,
    step: 1 | -1,
): number {
    if (length === 0) {
        return 0;
    }
    return (index + step + length) % length;
}
