import { DEFAULT_SESSION_DURATION } from '@/components/session/options';
import type {
    SessionActivity,
    SessionDay,
    SessionDraft,
    TopicEntry,
} from '@/components/session/types';
import { shiftIsoDate } from '@/lib/dates';
import type { SearchTopic } from '@/types/overlay';

const MINUTES_PER_HOUR = 60;

export type SessionToEdit = {
    id: string;
    topicId: string;
    date: string;
    durationMinutes: number;
    activities: SessionActivity[];
    note: string;
};

export function toTopicEntries(topics: SearchTopic[]): TopicEntry[] {
    return topics.map((topic) => ({
        id: topic.id,
        title: topic.title,
        status: topic.status,
        path: topic.location.toLowerCase(),
    }));
}

export function resolveInitialTopicId(
    topics: TopicEntry[],
    requestedId: string | undefined,
): string {
    const requestedTopic = topics.find((topic) => topic.id === requestedId);
    return (requestedTopic ?? topics[0])?.id ?? '';
}

export function toggleActivity(
    activities: SessionActivity[],
    activity: SessionActivity,
): SessionActivity[] {
    return activities.includes(activity)
        ? activities.filter((item) => item !== activity)
        : [...activities, activity];
}

function dayOf(date: string, today: string): SessionDay {
    if (date === today) {
        return 'today';
    }
    return date === shiftIsoDate(today, -1) ? 'yesterday' : 'other';
}

export function buildInitialDraft({
    topics,
    today,
    requestedTopicId,
    session,
}: {
    topics: TopicEntry[];
    today: string;
    requestedTopicId: string | undefined;
    session: SessionToEdit | undefined;
}): SessionDraft {
    if (session) {
        return {
            topicId: session.topicId,
            day: dayOf(session.date, today),
            otherDate: session.date,
            durationMinutes: session.durationMinutes,
            activities: session.activities,
            note: session.note,
        };
    }

    return {
        topicId: resolveInitialTopicId(topics, requestedTopicId),
        day: 'today',
        otherDate: today,
        durationMinutes: DEFAULT_SESSION_DURATION,
        activities: [],
        note: '',
    };
}

export function resolveSessionDate(draft: SessionDraft, today: string): string {
    if (draft.day === 'today') {
        return today;
    }
    return draft.day === 'yesterday'
        ? shiftIsoDate(today, -1)
        : draft.otherDate;
}

export function formatSessionDuration(totalMinutes: number): string {
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
