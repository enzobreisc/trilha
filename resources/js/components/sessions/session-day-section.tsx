import type { SessionDayGroup } from '@/components/sessions/types';
import { SessionEntryRow } from '@/components/sessions/session-entry-row';
import { useTranslation } from '@/hooks/use-translation';

export function SessionDaySection({
    group,
    selectedId,
    onSelect,
}: {
    group: SessionDayGroup;
    selectedId: string | undefined;
    onSelect: (sessionId: string) => void;
}) {
    const { plural, weekdayAndDay } = useTranslation();

    return (
        <div className="flex flex-col gap-1">
            <div className="flex justify-between px-3 text-xs font-semibold text-muted">
                <span>{weekdayAndDay(group.date)}</span>
                <span>
                    {plural(group.sessions.length, 'sessão', 'sessões')}
                </span>
            </div>
            {group.sessions.map((session) => (
                <SessionEntryRow
                    key={session.id}
                    session={session}
                    isSelected={session.id === selectedId}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
}
