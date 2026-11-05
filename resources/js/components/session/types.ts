import type { TranslationKey } from '@/lib/i18n';
import type { TopicStatus } from '@/types/topic';

export type SessionActivity = 'docs' | 'solo' | 'compare' | 'project';

export type SessionDay = 'today' | 'yesterday' | 'other';

export type SessionDraft = {
    topicKey: string;
    day: SessionDay;
    durationMinutes: number;
    activities: SessionActivity[];
    note: string;
};

export type SessionActivityOption = {
    id: SessionActivity;
    label: TranslationKey;
};

export type TopicEntry = {
    id: string;
    title: string;
    status: TopicStatus;
    path: string;
};
