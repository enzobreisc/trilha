import type { TopicSession } from '@/components/topic/types';

export { formatSessionDuration as formatDuration } from '@/components/session/session-draft';

export function getTotalMinutes(sessions: TopicSession[]): number {
    return sessions.reduce((total, session) => total + session.minutes, 0);
}
