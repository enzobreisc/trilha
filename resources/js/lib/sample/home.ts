import type { HomeData } from '@/components/home/types';
import { sampleActiveTopicId } from '@/lib/sample-data';

export const sampleHomeData: HomeData = {
    profileName: 'Enzo',
    dateLabel: 'ter, 3 nov',
    roadmapName: 'laravel-por-dentro',
    stats: {
        weekLabel: 'seg 2 – dom 8',
        weekStudyTime: '4h20',
        weekSessionCount: 5,
        weekCompletedTopics: 3,
        streakDays: 12,
    },
    progress: { done: 23, total: 56 },
    currentTopic: {
        id: sampleActiveTopicId,
        title: 'Problema N+1',
        description:
            'Perceber quando um loop dispara uma consulta por item e resolver com eager loading.',
        breadcrumb: '05 banco-de-dados / performance',
        href: `/topics/${sampleActiveTopicId}`,
        startedOn: '31 out',
        timeSpent: '3h10',
        sessionCount: 4,
        checklist: [
            {
                label: 'Reconhecer o padrão: uma consulta para a lista e mais uma por item',
                isDone: true,
            },
            {
                label: 'Contar as queries de uma página no Debugbar ou no Telescope',
                isDone: true,
            },
            {
                label: 'Carregar relações antes com with() e contagens com withCount()',
                isDone: true,
            },
            {
                label: 'Usar load() quando a coleção já foi buscada',
                isDone: false,
            },
            {
                label: 'Ligar Model::preventLazyLoading() em desenvolvimento',
                isDone: false,
            },
        ],
        history: [
            {
                when: 'ontem 21:40',
                kind: 'session',
                detail: '50 min · documentação de eager loading',
            },
            {
                when: 'há 2 dias',
                kind: 'exercise',
                detail: 'sem IA · posts com autor',
            },
            {
                when: 'há 2 dias',
                kind: 'comparison',
                detail: 'com a versão da IA, 2 diferenças',
            },
        ],
    },
    completedTopicTitle: 'Problema N+1',
    nextTopic: {
        title: 'Eager loading com restrições',
        description:
            'Carregar só o que a tela precisa, com constraints dentro do with().',
        breadcrumb: '05 banco-de-dados / performance',
        href: '/topics/eager-loading-com-restricoes',
    },
    reviews: [
        {
            id: 'service-container',
            title: 'Service Container',
            area: 'laravel',
            dueIn: '7d',
        },
        {
            id: 'autorizacao-na-request',
            title: 'Autorização na request',
            area: 'laravel',
            dueIn: '30d',
        },
        {
            id: 'migrations-em-producao',
            title: 'Migrations em produção',
            area: 'laravel',
            dueIn: '7d',
        },
    ],
};
