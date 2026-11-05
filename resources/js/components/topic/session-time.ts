import type { TopicSession } from '@/lib/sample/topic';

const MINUTES_PER_HOUR = 60;

export function formatDuration(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / MINUTES_PER_HOUR);
    const minutes = totalMinutes % MINUTES_PER_HOUR;

    if (hours === 0) {
        return `${minutes}m`;
    }
    if (minutes === 0) {
        return `${hours}h`;
    }
    return `${hours}h${String(minutes).padStart(2, '0')}`;
}

export function getTotalMinutes(sessions: TopicSession[]): number {
    return sessions.reduce((total, session) => total + session.minutes, 0);
}
