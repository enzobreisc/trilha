import { Link } from '@inertiajs/react';
import { Fragment } from 'react';
import { OverlayMenuCaption } from '@/components/overlays/overlay-menu-row';
import type { SearchResult } from '@/components/overlays/search-results';
import { StatusIcon } from '@/components/status-icon';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

const ACTION_MARKER = '+';

export function SearchResultList({
    results,
    activeIndex,
    listboxId,
    onHoverIndex,
}: {
    results: SearchResult[];
    activeIndex: number;
    listboxId: string;
    onHoverIndex: (index: number) => void;
}) {
    const { t } = useTranslation();

    if (results.length === 0) {
        return (
            <p className="px-5 py-8 text-center text-sm font-medium text-faint">
                {t('nenhum resultado encontrado')}
            </p>
        );
    }

    return (
        <div
            id={listboxId}
            role="listbox"
            aria-label={t('Buscar tópico')}
            className="flex max-h-120 flex-col overflow-y-auto py-1.5"
        >
            {results.map((result, index) => {
                const previous = results[index - 1];
                const startsGroup = previous?.kind !== result.kind;
                const groupLabel =
                    result.kind === 'topic' ? result.roadmapName : t('ações');

                return (
                    <Fragment key={`${result.kind}-${result.id}`}>
                        {startsGroup && (
                            <OverlayMenuCaption>
                                {groupLabel}
                            </OverlayMenuCaption>
                        )}
                        <SearchResultRow
                            result={result}
                            optionId={`${listboxId}-option-${index}`}
                            isActive={index === activeIndex}
                            onHover={() => onHoverIndex(index)}
                        />
                    </Fragment>
                );
            })}
        </div>
    );
}

function SearchResultRow({
    result,
    optionId,
    isActive,
    onHover,
}: {
    result: SearchResult;
    optionId: string;
    isActive: boolean;
    onHover: () => void;
}) {
    const { t } = useTranslation();

    return (
        <Link
            id={optionId}
            href={result.href}
            role="option"
            aria-selected={isActive}
            onMouseEnter={onHover}
            className={cn(
                'flex min-h-10 items-center gap-3 border-l-3 px-3.5 py-1.5 text-sm font-medium',
                isActive
                    ? 'border-accent bg-primary/25 text-text'
                    : 'border-transparent text-secondary',
            )}
        >
            {result.kind === 'topic' ? (
                <StatusIcon status={result.status} size={16} />
            ) : (
                <span
                    aria-hidden="true"
                    className="flex w-4 shrink-0 justify-center font-mono text-accent"
                >
                    {ACTION_MARKER}
                </span>
            )}
            <span className="min-w-0 flex-1">
                <span className="block truncate">
                    {result.kind === 'topic' ? result.title : t(result.label)}
                </span>
                {result.kind === 'topic' && (
                    <span className="block truncate font-mono text-[11px] font-normal text-muted">
                        {result.location}
                    </span>
                )}
            </span>
        </Link>
    );
}
