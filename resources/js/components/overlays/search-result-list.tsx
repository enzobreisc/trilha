import { Link } from '@inertiajs/react';
import { Fragment } from 'react';
import { BoltIcon } from '@/components/overlays/overlay-icons';
import { OverlayMenuCaption } from '@/components/overlays/overlay-menu-row';
import type { SearchResult } from '@/components/overlays/search-results';
import { StatusIcon } from '@/components/status-icon';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

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
            className="flex max-h-120 flex-col gap-0.5 overflow-y-auto p-2"
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
                'flex min-h-10 items-center gap-3 rounded-sm px-3 text-sm font-semibold',
                isActive ? 'bg-active text-white' : 'text-secondary',
            )}
        >
            {result.kind === 'topic' ? (
                <StatusIcon status={result.status} size={16} />
            ) : (
                <BoltIcon className="shrink-0 text-accent" />
            )}
            <span className="min-w-0 flex-1 truncate">
                {result.kind === 'topic' ? result.title : t(result.label)}
            </span>
            {result.kind === 'topic' && (
                <span className="truncate text-xs font-medium text-faint">
                    {result.location}
                </span>
            )}
        </Link>
    );
}
