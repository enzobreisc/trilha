import type {
    SessionDayGroup,
    SessionEntry,
} from '@/components/sessions/types';

export function groupSessionsByDay(
    sessions: SessionEntry[],
): SessionDayGroup[] {
    const sessionsByDate = new Map<string, SessionEntry[]>();

    sessions.forEach((session) => {
        sessionsByDate.set(session.date, [
            ...(sessionsByDate.get(session.date) ?? []),
            session,
        ]);
    });

    return [...sessionsByDate].map(([date, daySessions]) => ({
        date,
        sessions: daySessions,
    }));
}
