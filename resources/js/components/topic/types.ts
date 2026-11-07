import type { SessionActivity } from '@/components/session/types';
import type { TopicStatus } from '@/types/topic';

export type TopicSignals = {
    bad: string | null;
    good: string | null;
};

export type TopicSource = {
    title: string;
    url: string;
};

export type TopicExercise = {
    text: string;
    completedOn: string | null;
};

export type TopicSession = {
    id: string;
    date: string;
    time: string;
    minutes: number;
    activities: SessionActivity[];
    note: string | null;
};

export type TopicReview = {
    id: string;
    intervalDays: number;
    dueOn: string;
    outcome: 'ok' | 'again' | null;
};

export type TopicDetail = {
    id: string;
    key: string;
    title: string;
    path: string[];
    status: TopicStatus;
    summary: string | null;
    checklist: string[];
    checkedItems: number[];
    signals: TopicSignals | null;
    aiPrompt: string | null;
    reviewChecks: string[];
    exercise: TopicExercise | null;
    sources: TopicSource[];
    notes: string;
    startedOn: string | null;
    completedOn: string | null;
    sessions: TopicSession[];
    reviews: TopicReview[];
    reviewIntervals: number[];
    updateUrl: string;
};
