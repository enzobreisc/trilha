import type {
    ReviewDay,
    ReviewItem,
    UpcomingReview,
} from '@/components/reviews/types';

export const sampleReviewItems: ReviewItem[] = [
    {
        id: 'service-container',
        title: 'Service Container',
        roadmapId: 'laravel-por-dentro',
        path: '02 laravel / núcleo',
        summary:
            'Bindings, singletons, resolução automática e quando registrar uma interface para uma implementação.',
        interval: '7d',
    },
    {
        id: 'autorizacao-na-request',
        title: 'Autorização na request',
        roadmapId: 'laravel-por-dentro',
        path: '03 controllers / form-requests',
        summary:
            'O método authorize do Form Request e quando a checagem deveria estar numa Policy.',
        interval: '30d',
    },
    {
        id: 'migrations-em-producao',
        title: 'Migrations em produção',
        roadmapId: 'laravel-por-dentro',
        path: '05 banco / migrations',
        summary:
            'Rodar migrations sem derrubar o app, mudanças de coluna que travam a tabela e rollback seguro.',
        interval: '7d',
    },
    {
        id: 'blocos-de-transacao',
        title: 'Blocos de transação',
        roadmapId: 'postgres-e-concorrencia',
        path: '01 transações / fundamentos',
        summary:
            'BEGIN, COMMIT e ROLLBACK, e o que o banco garante quando uma transação falha no meio.',
        interval: '7d',
    },
];

export const sampleReviewDays: ReviewDay[] = [
    { date: '2026-11-03', count: 4, isToday: true },
    { date: '2026-11-04', count: 1 },
    { date: '2026-11-05', count: 0 },
    { date: '2026-11-06', count: 2 },
    { date: '2026-11-07', count: 0 },
    { date: '2026-11-08', count: 1 },
    { date: '2026-11-09', count: 1 },
    { date: '2026-11-10', count: 0 },
    { date: '2026-11-11', count: 0 },
    { date: '2026-11-12', count: 3 },
    { date: '2026-11-13', count: 1 },
    { date: '2026-11-14', count: 0 },
    { date: '2026-11-15', count: 0 },
    { date: '2026-11-16', count: 2 },
];

export const sampleUpcomingReviews: UpcomingReview[] = [
    {
        date: '2026-11-04',
        title: 'Middleware',
        roadmapId: 'laravel-por-dentro',
        interval: '7d',
    },
    {
        date: '2026-11-06',
        title: 'Cookies',
        roadmapId: 'laravel-por-dentro',
        interval: '30d',
    },
    {
        date: '2026-11-06',
        title: 'Estrutura de tabelas',
        roadmapId: 'laravel-por-dentro',
        interval: '7d',
    },
    {
        date: '2026-11-08',
        title: 'Controllers finos',
        roadmapId: 'laravel-por-dentro',
        interval: '7d',
    },
    {
        date: '2026-11-09',
        title: 'Separação de responsabilidades',
        roadmapId: 'laravel-por-dentro',
        interval: '7d',
    },
];
