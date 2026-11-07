import { ALL_ROADMAPS_FILTER } from '@/components/sessions/session-filters';
import type { SessionEntry, SessionPeriod } from '@/components/sessions/types';
import { daysBetween } from '@/lib/dates';

const PERIOD_DAYS: Record<SessionPeriod, number> = {
    '7d': 7,
    '30d': 30,
    all: Infinity,
};

export function filterSessions({
    sessions,
    roadmapFilter,
    period,
    today,
}: {
    sessions: SessionEntry[];
    roadmapFilter: string;
    period: SessionPeriod;
    today: string;
}): SessionEntry[] {
    return sessions.filter(
        (session) =>
            (roadmapFilter === ALL_ROADMAPS_FILTER ||
                session.roadmapId === roadmapFilter) &&
            daysBetween(session.date, today) < PERIOD_DAYS[period],
    );
}
