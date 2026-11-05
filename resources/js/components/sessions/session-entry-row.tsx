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
                'flex flex-col rounded-sm',
                isSelected ? 'bg-active' : 'hover:bg-active/60',
            )}
        >
            <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => onSelect(session.id)}
                className="flex w-full items-center gap-4 px-3 py-3 text-left"
            >
                <span className="w-12 shrink-0 font-mono text-xs text-faint">
                    {session.startTime}
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="truncate text-sm font-semibold text-text">
                        {session.topicTitle}
                    </span>
                    {summary && (
                        <span className="truncate text-xs text-muted">
                            {summary}
                        </span>
                    )}
                </span>
                <span className="shrink-0 rounded-full px-2.5 py-0.5 text-xs text-muted inset-ring inset-ring-border">
                    {session.roadmapId}
                </span>
                <span className="w-14 shrink-0 text-right font-mono text-sm font-semibold text-text">
                    {formatSessionDuration(session.durationMinutes)}
                </span>
            </button>
            {isSelected && <SessionEntryDetails session={session} />}
        </div>
    );
}
