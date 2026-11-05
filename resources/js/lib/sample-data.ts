import { sampleRoadmaps } from '@/lib/sample/start';
import type { AppChrome } from '@/types/app-chrome';
import type { ContributionDay, HeatLevel } from '@/types/contribution';
import type {
    TopicStatus,
    TopicTreeSection,
    TopicTreeTopic,
} from '@/types/topic';

type TopicSeed = [title: string, status: TopicStatus];

type SectionSeed = {
    number: string;
    name: string;
    groups: { name: string; topics: TopicSeed[] }[];
};

const DAY_MS = 24 * 60 * 60 * 1000;
const CONTRIBUTION_START_MS = Date.UTC(2026, 4, 4);
const CONTRIBUTION_DAY_COUNT = 182;
const SAMPLE_HEAT_LEVELS: HeatLevel[] = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4];

const SAMPLE_ROADMAP: SectionSeed[] = [
    {
        number: '01',
        name: 'Fundamentos HTTP',
        groups: [
            {
                name: 'Requisição',
                topics: [
                    ['Ciclo da requisição', 'done'],
                    ['Métodos HTTP', 'done'],
                    ['Status codes', 'done'],
                ],
            },
            {
                name: 'Estado',
                topics: [
                    ['Cookies', 'done'],
                    ['Sessões', 'done'],
                ],
            },
        ],
    },
    {
        number: '02',
        name: 'Laravel por dentro',
        groups: [
            {
                name: 'Núcleo',
                topics: [
                    ['Ciclo de vida', 'done'],
                    ['Service Container', 'review'],
                    ['Injeção de dependência', 'done'],
                    ['Service Providers', 'done'],
                ],
            },
            {
                name: 'Rotas e middleware',
                topics: [
                    ['Rotas', 'done'],
                    ['Middleware', 'done'],
                    ['Rate limiting', 'todo'],
                ],
            },
        ],
    },
    {
        number: '03',
        name: 'Controllers e API',
        groups: [
            {
                name: 'Controllers',
                topics: [
                    ['Estrutura', 'done'],
                    ['Controllers finos', 'done'],
                    ['Invocáveis', 'done'],
                ],
            },
            {
                name: 'Form Requests',
                topics: [
                    ['Regras de validação', 'done'],
                    ['Autorização na request', 'review'],
                    ['Preparar dados', 'todo'],
                ],
            },
            {
                name: 'API Resources',
                topics: [
                    ['Transformar dados', 'todo'],
                    ['Coleções e paginação', 'todo'],
                ],
            },
        ],
    },
    {
        number: '04',
        name: 'Arquitetura de código',
        groups: [
            {
                name: 'Camadas',
                topics: [
                    ['Separação de responsabilidades', 'done'],
                    ['Service classes', 'todo'],
                    ['Action classes', 'todo'],
                ],
            },
            {
                name: 'Padrões',
                topics: [
                    ['Repository: quando não usar', 'todo'],
                    ['DTOs', 'todo'],
                    ['SOLID na prática', 'todo'],
                ],
            },
            {
                name: 'Code smells',
                topics: [
                    ['Fat controller', 'todo'],
                    ['God object', 'todo'],
                    ['Abuso de facades', 'todo'],
                ],
            },
        ],
    },
    {
        number: '05',
        name: 'Banco de Dados',
        groups: [
            {
                name: 'Migrations',
                topics: [
                    ['Estrutura de tabelas', 'done'],
                    ['Chaves estrangeiras', 'done'],
                    ['Migrations em produção', 'review'],
                ],
            },
            {
                name: 'Factories e seeders',
                topics: [
                    ['Factories', 'done'],
                    ['Estados de factory', 'todo'],
                    ['Dados relacionados', 'todo'],
                ],
            },
            {
                name: 'Performance',
                topics: [
                    ['Relacionamentos', 'done'],
                    ['Consultas Eloquent', 'done'],
                    ['Problema N+1', 'studying'],
                    ['Eager loading com restrições', 'todo'],
                    ['Índices compostos', 'todo'],
                    ['Consultas lentas', 'todo'],
                    ['Cache de consultas', 'todo'],
                ],
            },
            {
                name: 'Transações',
                topics: [
                    ['Blocos de transação', 'todo'],
                    ['Rollback automático', 'todo'],
                    ['Locks pessimista e otimista', 'todo'],
                    ['Race conditions', 'todo'],
                    ['Deadlocks', 'todo'],
                ],
            },
        ],
    },
    {
        number: '06',
        name: 'Design de APIs REST',
        groups: [
            {
                name: 'Nomes de recursos',
                topics: [
                    ['Plural e hierarquia', 'todo'],
                    ['Filtros e ordenação', 'todo'],
                    ['Seleção de campos', 'todo'],
                ],
            },
            {
                name: 'Versionamento',
                topics: [
                    ['Por URI', 'todo'],
                    ['Por header', 'todo'],
                    ['Quebras de contrato', 'todo'],
                ],
            },
            {
                name: 'Respostas',
                topics: [
                    ['Formato de sucesso', 'todo'],
                    ['Formato de erro', 'todo'],
                    ['Paginação', 'todo'],
                ],
            },
        ],
    },
];

function slugify(text: string): string {
    return text
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .replace(/\+/g, ' mais ')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

function toTreeTopic([title, status]: TopicSeed): TopicTreeTopic {
    const id = slugify(title);
    return { id, title, status, href: `/topics/${id}` };
}

export const sampleAppChrome: AppChrome = {
    profileName: 'Enzo',
    roadmaps: sampleRoadmaps.map(({ id, name, doneTopics, totalTopics }) => ({
        id,
        name,
        doneTopics,
        totalTopics,
    })),
    currentRoadmapId: sampleRoadmaps[0].id,
    reviewsDue: 3,
};

export const sampleActiveTopicId = 'problema-n-mais-1';

export const sampleTopicTree: TopicTreeSection[] = SAMPLE_ROADMAP.map(
    (section) => ({
        id: slugify(section.name),
        number: section.number,
        name: section.name,
        groups: section.groups.map((group) => ({
            name: group.name,
            topics: group.topics.map(toTreeTopic),
        })),
    }),
);

function sampleHeatLevel(dayIndex: number): HeatLevel {
    const bucket = (dayIndex * 37 + Math.floor(dayIndex / 7) * 13) % 11;
    return SAMPLE_HEAT_LEVELS[bucket];
}

export const sampleContributionDays: ContributionDay[] = Array.from(
    { length: CONTRIBUTION_DAY_COUNT },
    (_, dayIndex) => ({
        date: new Date(CONTRIBUTION_START_MS + dayIndex * DAY_MS)
            .toISOString()
            .slice(0, 10),
        level: sampleHeatLevel(dayIndex),
    }),
);
