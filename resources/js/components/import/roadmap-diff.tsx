import { useMessageText } from '@/components/import/use-message-text';
import { useTranslation } from '@/hooks/use-translation';
import type {
    RoadmapDiff,
    RoadmapDiffChange,
    RoadmapDiffEntry,
} from '@/lib/sample/import';
import { cn } from '@/lib/utils';

const CHANGE_DOT_CLASSES: Record<RoadmapDiffChange, string> = {
    added: 'bg-accent',
    changed: 'bg-secondary',
    removed: 'bg-faint',
};

const CHANGE_TONES: Record<RoadmapDiffChange, string> = {
    added: 'text-accent',
    changed: 'text-secondary',
    removed: 'text-muted',
};

const CHANGE_PILL_CLASSES: Record<RoadmapDiffChange, string> = {
    added: 'bg-active text-accent',
    changed: 'bg-elevated text-secondary inset-ring inset-ring-strong',
    removed: 'bg-elevated text-muted inset-ring inset-ring-border',
};

export function RoadmapDiffView({ diff }: { diff: RoadmapDiff }) {
    const { t, plural } = useTranslation();
    const readMessage = useMessageText();
    const countOf = (change: RoadmapDiffChange) =>
        diff.entries.filter((entry) => entry.change === change).length;

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
                <span
                    className={cn(
                        'rounded-full px-3 py-1',
                        CHANGE_PILL_CLASSES.added,
                    )}
                >
                    {plural(countOf('added'), 'novo', 'novos')}
                </span>
                <span
                    className={cn(
                        'rounded-full px-3 py-1',
                        CHANGE_PILL_CLASSES.changed,
                    )}
                >
                    {plural(countOf('changed'), 'alterado', 'alterados')}
                </span>
                <span
                    className={cn(
                        'rounded-full px-3 py-1',
                        CHANGE_PILL_CLASSES.removed,
                    )}
                >
                    {plural(countOf('removed'), 'arquivado', 'arquivados')}
                </span>
                <span className="rounded-full bg-elevated px-3 py-1 text-faint inset-ring inset-ring-border">
                    {t(':count sem mudança', {
                        count: diff.unchangedCount,
                    })}
                </span>
            </div>
            <ul className="flex flex-col overflow-x-auto rounded-sm bg-elevated px-4 font-mono text-sm inset-ring inset-ring-border">
                {diff.entries.map((entry) => (
                    <DiffRow
                        key={`${entry.change}-${entry.location}-${entry.topicKey}`}
                        entry={entry}
                        noteText={entry.note && readMessage(entry.note)}
                    />
                ))}
            </ul>
            <p className="text-xs text-faint">{readMessage(diff.note)}</p>
        </div>
    );
}

function DiffRow({
    entry,
    noteText,
}: {
    entry: RoadmapDiffEntry;
    noteText: string | undefined;
}) {
    return (
        <li className="flex min-h-10 items-center gap-3 border-b border-border whitespace-nowrap last:border-b-0">
            <span
                aria-hidden="true"
                className={cn(
                    'size-2 shrink-0 rounded-full',
                    CHANGE_DOT_CLASSES[entry.change],
                )}
            />
            <span className="text-faint">{entry.location}</span>
            <span className={CHANGE_TONES[entry.change]}>{entry.topicKey}</span>
            {noteText && <span className="text-faint">· {noteText}</span>}
        </li>
    );
}
