import type {
    StartActivityEntry,
    StartReview,
    StartStats,
} from '@/components/start/types';
import type { RoadmapSummary } from '@/types/roadmap';

export const sampleStartToday = '2026-11-03';

export const sampleRoadmaps: RoadmapSummary[] = [
    {
        id: 'laravel-por-dentro',
        name: 'laravel-por-dentro',
        subtitle: 'parte 1',
        totalTopics: 56,
        doneTopics: 23,
        currentTopic: {
            title: 'Problema N+1',
            section: '05 banco-de-dados/performance/',
            href: '/topics/problema-n-mais-1',
        },
        reviewsDue: 3,
        lastStudiedDaysAgo: 0,
    },
    {
        id: 'postgres-e-concorrencia',
        name: 'postgres-e-concorrencia',
        subtitle: 'semana 1',
        totalTopics: 34,
        doneTopics: 8,
        currentTopic: {
            title: 'Níveis de isolamento',
            section: '02 transacoes/isolamento/',
            href: '/',
        },
        reviewsDue: 1,
        lastStudiedDaysAgo: 1,
    },
    {
        id: 'docker-e-deploy',
        name: 'docker-e-deploy',
        subtitle: 'parte 1',
        totalTopics: 28,
        doneTopics: 0,
        currentTopic: {
            title: 'Imagens e camadas',
            section: '01 containers/',
            href: '/',
        },
        reviewsDue: 0,
        lastStudiedDaysAgo: null,
    },
    {
        id: 'ingles-tecnico',
        name: 'ingles-tecnico',
        subtitle: 'completo',
        totalTopics: 40,
        doneTopics: 40,
        currentTopic: {
            title: 'Blocos de transação',
            section: '05 banco-de-dados/transacoes/',
            href: '/',
        },
        reviewsDue: 0,
        lastStudiedDaysAgo: 6,
    },
];

export const sampleStartReviews: StartReview[] = [
    {
        id: 'service-container',
        title: 'Service Container',
        roadmapTag: 'laravel',
        intervalLabel: '7d',
    },
    {
        id: 'autorizacao-na-request',
        title: 'Autorização na request',
        roadmapTag: 'laravel',
        intervalLabel: '30d',
    },
    {
        id: 'migrations-em-producao',
        title: 'Migrations em produção',
        roadmapTag: 'laravel',
        intervalLabel: '7d',
    },
    {
        id: 'blocos-de-transacao',
        title: 'Blocos de transação',
        roadmapTag: 'postgres',
        intervalLabel: '7d',
    },
];

export const sampleStartActivity: StartActivityEntry[] = [
    {
        id: 'problema-n-mais-1-session',
        date: '2026-11-03',
        time: '21:40',
        roadmapSlug: 'problema-n-mais-1',
        detail: 'sessão 50 min · documentação de eager loading',
        tone: 'bright',
    },
    {
        id: 'niveis-de-isolamento-session',
        date: '2026-11-02',
        time: '19:05',
        roadmapSlug: 'niveis-de-isolamento',
        detail: 'sessão 35 min · READ COMMITTED',
        tone: 'mid',
    },
    {
        id: 'problema-n-mais-1-exercise',
        date: '2026-11-02',
        time: '08:30',
        roadmapSlug: 'problema-n-mais-1',
        detail: 'exercício sem IA · posts com autor',
        tone: 'bright',
    },
    {
        id: 'migrations-em-producao-marked',
        date: '2026-11-01',
        time: null,
        roadmapSlug: 'migrations-em-producao',
        detail: 'marcado para revisar',
        tone: 'bright',
    },
    {
        id: 'blocos-de-transacao-completed',
        date: '2026-10-31',
        time: null,
        roadmapSlug: 'blocos-de-transacao',
        detail: 'concluído',
        tone: 'mid',
    },
];

export const sampleStartStats: StartStats = {
    streakDays: 12,
    sessionCount: 142,
};
