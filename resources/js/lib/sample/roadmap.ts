import type {
    RoadmapData,
    RoadmapSectionData,
    RoadmapTopic,
} from '@/components/roadmap/types';
import { sampleStartToday } from '@/lib/sample/start';
import { sampleTopicTree } from '@/lib/sample-data';
import type { TopicTreeSection, TopicTreeTopic } from '@/types/topic';

const STATUS_DATES: Partial<Record<string, string>> = {
    'Ciclo da requisição': '2026-10-28',
    'Métodos HTTP': '2026-10-28',
    'Status codes': '2026-10-29',
    Cookies: '2026-10-29',
    Sessões: '2026-10-30',
    'Ciclo de vida': '2026-10-30',
    'Service Container': '2026-10-30',
    'Injeção de dependência': '2026-10-31',
    'Service Providers': '2026-10-31',
    Rotas: '2026-10-31',
    Middleware: '2026-11-01',
    'Estrutura de tabelas': '2026-11-01',
    'Chaves estrangeiras': '2026-11-01',
    'Migrations em produção': '2026-11-01',
    Relacionamentos: '2026-11-02',
    'Consultas Eloquent': '2026-11-02',
};

function withStatusDate(topic: TopicTreeTopic): RoadmapTopic {
    const statusDate =
        topic.status === 'studying'
            ? sampleStartToday
            : (STATUS_DATES[topic.title] ?? null);

    return { ...topic, statusDate };
}

function toRoadmapSection(section: TopicTreeSection): RoadmapSectionData {
    return {
        ...section,
        groups: section.groups.map((group) => ({
            name: group.name,
            topics: group.topics.map(withStatusDate),
        })),
    };
}

export const sampleRoadmapData: RoadmapData = {
    title: 'Laravel Backend · Parte 1',
    sourceLabel: 'laravel-backend / parte-1',
    sourceFile: 'laravel-parte-1.json',
    importedOn: sampleStartToday,
    today: sampleStartToday,
    importSummary: {
        fileName: 'laravel-parte-1.json',
        addedCount: 4,
        changedCount: 2,
        archivedCount: 1,
    },
    sections: sampleTopicTree.map(toRoadmapSection),
    archivedTopics: [
        {
            id: 'cache-de-consultas',
            title: 'Cache de consultas',
            restoredOn: sampleStartToday,
            sessionCount: 1,
        },
    ],
    expandedSectionIds: [
        'fundamentos-http',
        'laravel-por-dentro',
        'banco-de-dados',
    ],
};
