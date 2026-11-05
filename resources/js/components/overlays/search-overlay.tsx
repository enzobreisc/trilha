import { router } from '@inertiajs/react';
import { useId, useState } from 'react';
import type { ChangeEvent, KeyboardEvent } from 'react';
import { OverlayContainer } from '@/components/overlays/overlay-container';
import { OverlayKbd } from '@/components/overlays/overlay-kbd';
import { SearchResultList } from '@/components/overlays/search-result-list';
import {
    cycleIndex,
    findSearchResults,
} from '@/components/overlays/search-results';
import { SearchIcon } from '@/components/ui/icons';
import { useTranslation } from '@/hooks/use-translation';
import { sampleSearchActions, sampleSearchTopics } from '@/lib/sample/overlays';
import type { SearchAction, SearchTopic } from '@/types/overlay';

export function SearchOverlay({
    onClose,
    topics = sampleSearchTopics,
    actions = sampleSearchActions,
}: {
    onClose: () => void;
    topics?: SearchTopic[];
    actions?: SearchAction[];
}) {
    const { t, plural } = useTranslation();
    const listboxId = useId();
    const [query, setQuery] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const results = findSearchResults(query, topics, actions);
    const activeResult = results.at(activeIndex);
    const topicCount = results.filter(
        (result) => result.kind === 'topic',
    ).length;
    const actionCount = results.length - topicCount;

    function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
        setQuery(event.target.value);
        setActiveIndex(0);
    }

    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            const step = event.key === 'ArrowDown' ? 1 : -1;
            setActiveIndex(cycleIndex(activeIndex, results.length, step));
            return;
        }

        if (event.key === 'Enter' && activeResult) {
            event.preventDefault();
            router.visit(activeResult.href);
        }
    }

    return (
        <OverlayContainer
            role="dialog"
            label={t('Buscar tópico')}
            onClose={onClose}
            className="top-28 left-1/2 w-[calc(100%-2rem)] max-w-160 -translate-x-1/2"
        >
            <div className="flex h-14 shrink-0 items-center gap-3 border-b border-border px-5">
                <SearchIcon className="shrink-0 text-muted" />
                <input
                    type="text"
                    role="combobox"
                    aria-expanded={results.length > 0}
                    aria-controls={listboxId}
                    aria-activedescendant={
                        activeResult
                            ? `${listboxId}-option-${activeIndex}`
                            : undefined
                    }
                    autoComplete="off"
                    value={query}
                    placeholder={t('buscar tópico…')}
                    onChange={handleQueryChange}
                    onKeyDown={handleKeyDown}
                    className="min-w-0 flex-1 bg-transparent text-base font-medium text-text outline-none placeholder:text-faint"
                />
                <span className="shrink-0 rounded-full bg-active px-2.5 py-1 text-xs font-semibold text-muted">
                    {t('todos os roadmaps')}
                </span>
                <OverlayKbd>esc</OverlayKbd>
            </div>
            <SearchResultList
                results={results}
                activeIndex={activeIndex}
                listboxId={listboxId}
                onHoverIndex={setActiveIndex}
            />
            <footer className="border-t border-border px-5 py-3 text-xs font-medium text-faint">
                {plural(topicCount, 'tópico', 'tópicos')} ·{' '}
                {plural(actionCount, 'ação', 'ações')}
            </footer>
        </OverlayContainer>
    );
}
