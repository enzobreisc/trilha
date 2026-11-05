import { useMessageText } from '@/components/import/use-message-text';
import { useTranslation } from '@/hooks/use-translation';
import type {
    RoadmapDiff,
    RoadmapDiffChange,
    RoadmapDiffEntry,
} from '@/lib/sample/import';
import { cn } from '@/lib/utils';

const CHANGE_GLYPHS: Record<RoadmapDiffChange, string> = {
    added: '+',
    changed: '~',
    removed: '−',
};

const CHANGE_TONES: Record<RoadmapDiffChange, string> = {
    added: 'text-accent',
    changed: 'text-link',
    removed: 'text-secondary',
};

export function RoadmapDiffView({ diff }: { diff: RoadmapDiff }) {
    const { t, plural } = useTranslation();
    const readMessage = useMessageText();
    const countOf = (change: RoadmapDiffChange) =>
        diff.entries.filter((entry) => entry.change === change).length;

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs">
                <span className={CHANGE_TONES.added}>
                    {CHANGE_GLYPHS.added}
                    {plural(countOf('added'), 'novo', 'novos')}
                </span>
                <span className={CHANGE_TONES.changed}>
                    {CHANGE_GLYPHS.changed}
                    {plural(countOf('changed'), 'alterado', 'alterados')}
                </span>
                <span className={CHANGE_TONES.removed}>
                    {CHANGE_GLYPHS.removed}
                    {plural(countOf('removed'), 'arquivado', 'arquivados')}
                </span>
                <span className="text-muted">
                    {t(':count sem mudança', {
                        count: diff.unchangedCount,
                    })}
                </span>
            </div>
            <ul className="flex flex-col overflow-x-auto font-mono text-sm">
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
        <li className="flex min-h-7 items-center gap-2.5 whitespace-nowrap">
            <span
                aria-hidden="true"
                className={cn('w-3 shrink-0', CHANGE_TONES[entry.change])}
            >
                {CHANGE_GLYPHS[entry.change]}
            </span>
            <span className="text-muted">{entry.location}</span>
            <span className="text-text">{entry.topicKey}</span>
            {noteText && <span className="text-muted">· {noteText}</span>}
        </li>
    );
}
