import type { TopicStatus } from '@/types/topic';

export type TopicSignal = {
    code: string;
    queries: number;
};

export type TopicSource = {
    title: string;
    url: string;
};

export type TopicExercise = {
    text: string;
    completed_on: string | null;
};

export type TopicSession = {
    id: string;
    title: string;
    activity: string;
    day: string;
    time: string;
    minutes: number;
};

export type TopicSchedule = {
    started_on: string;
    completed_on: string;
    seven_day_review_on: string;
    thirty_day_review_on: string;
};

export type TopicRoadmap = {
    name: string;
    completed_count: number;
    total_count: number;
    due_review_count: number;
};

export type TopicDetail = {
    key: string;
    title: string;
    path: string[];
    roadmap: TopicRoadmap;
    status: TopicStatus;
    summary: string;
    checklist: string[];
    checked_items: number[];
    signals: {
        bad: TopicSignal;
        good: TopicSignal;
    };
    ai_prompt: string;
    review_checks: string[];
    exercise: TopicExercise;
    sources: TopicSource[];
    notes: string;
    sessions: TopicSession[];
    schedule: TopicSchedule;
};

export const sampleTopicDetail: TopicDetail = {
    key: 'problema-n-mais-1',
    title: 'Problema N+1',
    path: ['laravel-por-dentro', '05 banco-de-dados', 'performance'],
    roadmap: {
        name: 'laravel-por-dentro',
        completed_count: 23,
        total_count: 56,
        due_review_count: 3,
    },
    status: 'studying',
    summary:
        'Quando um loop acessa uma relação que não foi carregada, o Eloquent faz uma consulta por item. Com 50 posts, viram 51 consultas. É o erro de performance mais comum em código gerado por IA.',
    checklist: [
        'Reconhecer o padrão: uma consulta para a lista e mais uma por item',
        'Contar as queries de uma página no Debugbar ou no Telescope',
        'Carregar relações antes com with() e contagens com withCount()',
        'Usar load() quando a coleção já foi buscada',
        'Ligar Model::preventLazyLoading() em desenvolvimento',
    ],
    checked_items: [0, 1, 2],
    signals: {
        bad: {
            code: '$posts = Post::all();\n\nforeach ($posts as $post) {\n    echo $post->author->name;\n}\n// uma consulta nova a cada volta',
            queries: 51,
        },
        good: {
            code: "$posts = Post::with('author')->get();\n\nforeach ($posts as $post) {\n    echo $post->author->name;\n}\n// autores carregados de uma vez",
            queries: 2,
        },
    },
    ai_prompt:
        'Liste os posts com o nome do autor e a quantidade de comentários usando eager loading (with e withCount). Ative Model::preventLazyLoading() no ambiente local e me diga quantas queries a página executa.',
    review_checks: [
        'Tem with() ou load() antes de qualquer loop que acessa relação?',
        'A contagem usa withCount() em vez de count() dentro do loop?',
        'Continua certo quando a lista é paginada?',
    ],
    exercise: {
        text: 'Crie a rota `/posts` listando 20 posts com autor e número de comentários. Meça as queries no Debugbar antes e depois de corrigir.',
        completed_on: '1 nov',
    },
    sources: [
        {
            title: 'Laravel Docs · Eager loading',
            url: 'https://laravel.com/docs/eloquent-relationships#eager-loading',
        },
        {
            title: 'Laravel Docs · Preventing lazy loading',
            url: 'https://laravel.com/docs/eloquent-relationships#preventing-lazy-loading',
        },
    ],
    notes: `## Diferenças com a versão da IA
- A IA usou with('author') mas esqueceu withCount('comments')
- Eu fiz count() dentro do loop: +20 queries

## Lembrar
preventLazyLoading só no local`,
    sessions: [
        {
            id: 'docs-eager-loading',
            title: 'Docs de eager loading',
            activity: 'Li a documentação',
            day: 'ontem',
            time: '21:40',
            minutes: 50,
        },
        {
            id: 'exercicio-sem-ia',
            title: 'Exercício sem IA',
            activity: 'Exercício sem IA',
            day: '1 nov',
            time: '19:10',
            minutes: 50,
        },
        {
            id: 'primeiro-contato',
            title: 'Primeiro contato com o N+1',
            activity: 'Li a documentação',
            day: '31 out',
            time: '20:00',
            minutes: 60,
        },
        {
            id: 'guia-de-performance',
            title: 'Guia de performance',
            activity: 'Li a documentação',
            day: '30 out',
            time: '19:30',
            minutes: 30,
        },
    ],
    schedule: {
        started_on: '31 out',
        completed_on: '3 nov',
        seven_day_review_on: '10 nov',
        thirty_day_review_on: '3 dez',
    },
};
