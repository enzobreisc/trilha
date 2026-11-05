import { formatSessionDuration } from '@/components/session/session-draft';
import type { SessionEntry } from '@/components/sessions/types';
import { SessionEntryDetails } from '@/components/sessions/session-entry-details';
import { useTranslation } from '@/hooks/use-translation';
import { sessionActivityOptions } from '@/lib/sample/session';
import { cn } from '@/lib/utils';

const SUMMARY_SEPARATOR = ' · ';

export function SessionEntryRow({
    session,
    isSelected,
    onSelect,
}: {
    session: SessionEntry;
    isSelected: boolean;
    onSelect: (sessionId: string) => void;
}) {
    const { t } = useTranslation();
    const activityLabels = sessionActivityOptions
        .filter((option) => session.activities.includes(option.id))
        .map((option) => t(option.label));
    const noteQuote = session.note ? [`“${session.note}”`] : [];
    const summary = [...activityLabels, ...noteQuote].join(SUMMARY_SEPARATOR);

    return (
        <div
            className={cn(
                'flex flex-col border-l-3',
                isSelected
                    ? 'border-l-accent bg-primary/25'
                    : 'border-l-transparent hover:bg-active',
            )}
        >
            <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => onSelect(session.id)}
                className="flex w-full items-baseline gap-3 px-3 py-2 text-left"
            >
                <span
                    aria-hidden="true"
                    className="w-3.5 shrink-0 font-mono text-accent"
                >
                    {isSelected ? '❯' : ''}
                </span>
                <span className="w-11 shrink-0 font-mono text-xs text-muted">
                    {session.startTime}
                </span>
                <span className="w-12 shrink-0 font-mono text-[13px] text-text">
                    {formatSessionDuration(session.durationMinutes)}
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="flex min-w-0 items-baseline gap-2">
                        <span className="truncate font-semibold text-text">
                            {session.topicTitle}
                        </span>
                        <span className="shrink-0 font-mono text-[11px] text-muted">
                            {session.roadmapId}
                        </span>
                    </span>
                    {summary && (
                        <span className="truncate text-sm text-secondary">
                            {summary}
                        </span>
                    )}
                </span>
            </button>
            {isSelected && <SessionEntryDetails session={session} />}
        </div>
    );
}
