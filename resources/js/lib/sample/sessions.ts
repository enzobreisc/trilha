import type { SessionEntry, SessionStats } from '@/components/sessions/types';

export const sampleSessions: SessionEntry[] = [
    {
        id: 'n-mais-1-2026-11-03',
        roadmapId: 'laravel-por-dentro',
        date: '2026-11-03',
        startTime: '21:40',
        durationMinutes: 50,
        topicTitle: 'Problema N+1',
        activities: ['docs'],
        note: 'Entendi a diferença entre with e load.',
    },
    {
        id: 'isolamento-2026-11-02',
        roadmapId: 'postgres-e-concorrencia',
        date: '2026-11-02',
        startTime: '19:05',
        durationMinutes: 35,
        topicTitle: 'Níveis de isolamento',
        activities: [],
        note: '',
    },
    {
        id: 'n-mais-1-2026-11-02',
        roadmapId: 'laravel-por-dentro',
        date: '2026-11-02',
        startTime: '08:30',
        durationMinutes: 50,
        topicTitle: 'Problema N+1',
        activities: [],
        note: '',
    },
    {
        id: 'migrations-2026-11-01',
        roadmapId: 'laravel-por-dentro',
        date: '2026-11-01',
        startTime: '19:10',
        durationMinutes: 90,
        topicTitle: 'Migrations em produção',
        activities: [],
        note: '',
    },
];

export const sampleSessionStats: SessionStats = {
    weekMinutes: 260,
    totalSessions: 142,
    streakDays: 12,
};
