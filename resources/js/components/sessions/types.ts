import type { SessionActivity } from '@/components/session/types';

export type SessionEntry = {
    id: string;
    roadmapId: string;
    topicId: string;
    date: string;
    startTime: string;
    durationMinutes: number;
    topicTitle: string;
    activities: SessionActivity[];
    note: string;
};

export type SessionDayGroup = {
    date: string;
    sessions: SessionEntry[];
};

export type SessionStats = {
    weekMinutes: number;
    totalSessions: number;
    streakDays: number;
};

export type SessionPeriod = '7d' | '30d' | 'all';
