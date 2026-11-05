import type { Replacements, TranslationKey } from '@/lib/i18n';

export type ImportMode = 'new' | 'update';

export type ImportMessage = {
    key: TranslationKey;
    replacements?: Replacements;
};

export type CheckStatus = 'ok' | 'warn' | 'error';

export type ValidationDetail = {
    location: string;
    note?: ImportMessage;
};

export type ValidationCheck = {
    status: CheckStatus;
    message: ImportMessage;
    details?: ValidationDetail[];
    hint?: ImportMessage;
};

export type ImportValidation = {
    fileName: string;
    fileMeta: ImportMessage;
    checks: ValidationCheck[];
};

export type RoadmapPreviewSection = {
    number: string;
    name: string;
    topicCount: number;
};

export type NewRoadmapImport = ImportValidation & {
    confirmLabel: ImportMessage;
    preview: RoadmapPreviewSection[];
};

export type RoadmapDiffChange = 'added' | 'changed' | 'removed';

export type RoadmapDiffEntry = {
    change: RoadmapDiffChange;
    location: string;
    topicKey: string;
    note?: ImportMessage;
};

export type RoadmapDiff = {
    entries: RoadmapDiffEntry[];
    unchangedCount: number;
    note: ImportMessage;
};

export type RoadmapMatch = {
    fileKey: string;
    roadmapName: string;
};

export type UpdatedRoadmapImport = ImportValidation & {
    confirmLabel: ImportMessage;
    match: RoadmapMatch;
    diff: RoadmapDiff;
};

export type InvalidRoadmapImport = ImportValidation & {
    updateTargetName?: string;
};

export type ImportResults = {
    new: NewRoadmapImport;
    update: UpdatedRoadmapImport;
    invalid: InvalidRoadmapImport;
};

export type FormatKeyTone = 'required' | 'optional';

export type FormatExampleLine = {
    indent: string;
    key?: string;
    keyTone?: FormatKeyTone;
    text: string;
};

export const sampleImportResults: ImportResults = {
    new: {
        fileName: 'laravel-parte-2.json',
        fileMeta: {
            key: ':size KB · alterado hoje',
            replacements: { size: 24 },
        },
        confirmLabel: {
            key: 'Importar :count tópicos',
            replacements: { count: 71 },
        },
        checks: [
            {
                status: 'ok',
                message: { key: 'JSON válido, formato trilha/v1' },
            },
            {
                status: 'ok',
                message: {
                    key: ':sections seções, :groups grupos, :topics tópicos',
                    replacements: { sections: 8, groups: 24, topics: 71 },
                },
            },
            {
                status: 'ok',
                message: { key: 'Chaves únicas em todos os níveis' },
            },
            {
                status: 'warn',
                message: {
                    key: ':count avisos, nada que impeça a importação',
                    replacements: { count: 2 },
                },
                details: [
                    {
                        location: 'code-review / feedback / dar-feedback',
                        note: { key: 'sem summary' },
                    },
                    {
                        location: 'queues / jobs / retries',
                        note: { key: 'sem checklist' },
                    },
                ],
            },
        ],
        preview: [
            { number: '01', name: 'Segurança', topicCount: 9 },
            { number: '02', name: 'Autenticação', topicCount: 8 },
            { number: '03', name: 'Erros e debugging', topicCount: 10 },
            { number: '04', name: 'Filas e jobs', topicCount: 11 },
            { number: '05', name: 'Cache', topicCount: 6 },
            { number: '06', name: 'Testes', topicCount: 12 },
            { number: '07', name: 'Deploy', topicCount: 8 },
            { number: '08', name: 'Code review', topicCount: 7 },
        ],
    },
    update: {
        fileName: 'laravel-parte-1.json',
        fileMeta: {
            key: ':size KB · alterado hoje',
            replacements: { size: 19 },
        },
        confirmLabel: { key: 'Aplicar mudanças' },
        checks: [
            {
                status: 'ok',
                message: { key: 'JSON válido, formato trilha/v1' },
            },
            {
                status: 'ok',
                message: {
                    key: 'Seu progresso é mantido: as chaves dos tópicos ligam status, notas e revisões',
                },
            },
        ],
        match: {
            fileKey: 'laravel-parte-1',
            roadmapName: 'laravel-por-dentro',
        },
        diff: {
            unchangedCount: 49,
            note: {
                key: 'O tópico removido tem uma sessão, então vai para "arquivados" em vez de ser apagado. Status, revisões e notas dos outros tópicos ficam como estão.',
            },
            entries: [
                {
                    change: 'added',
                    location: '04 arquitetura / padrões /',
                    topicKey: 'value-objects',
                },
                {
                    change: 'added',
                    location: '05 banco / performance /',
                    topicKey: 'chunk-e-lazy-collections',
                },
                {
                    change: 'added',
                    location: '06 apis-rest / respostas /',
                    topicKey: 'problem-details',
                },
                {
                    change: 'added',
                    location: '06 apis-rest / respostas /',
                    topicKey: 'idempotencia',
                },
                {
                    change: 'changed',
                    location: '05 banco / performance /',
                    topicKey: 'problema-n-mais-1',
                    note: { key: 'checklist mudou' },
                },
                {
                    change: 'changed',
                    location: '03 controllers / form-requests /',
                    topicKey: 'preparar-dados',
                    note: { key: 'título mudou' },
                },
                {
                    change: 'removed',
                    location: '05 banco / performance /',
                    topicKey: 'cache-de-consultas',
                    note: { key: 'arquivado: tem 1 sessão' },
                },
            ],
        },
    },
    invalid: {
        fileName: 'roadmap-final.json',
        fileMeta: {
            key: ':size KB · alterado hoje',
            replacements: { size: 31 },
        },
        updateTargetName: 'laravel-por-dentro',
        checks: [
            {
                status: 'error',
                message: {
                    key: 'JSON inválido na linha :line: vírgula sobrando depois do último tópico',
                    replacements: { line: 42 },
                },
            },
            {
                status: 'error',
                message: {
                    key: ':path: falta o campo "key"',
                    replacements: {
                        path: 'sections[3].groups[0].topics[2]',
                    },
                },
            },
            {
                status: 'error',
                message: {
                    key: 'Chave repetida: :topicKey aparece em 2 tópicos',
                    replacements: { topicKey: 'problema-n-mais-1' },
                },
                details: [
                    { location: '05 banco-de-dados / performance' },
                    { location: '05 banco-de-dados / transacoes' },
                ],
            },
            {
                status: 'warn',
                message: {
                    key: 'A chave :fileKey já existe no roadmap :roadmap',
                    replacements: {
                        fileKey: 'laravel-parte-1',
                        roadmap: 'laravel-por-dentro',
                    },
                },
                hint: {
                    key: 'Para trazer mudanças deste arquivo, use "atualizar existente".',
                },
            },
        ],
    },
};

export const sampleFormatExample: FormatExampleLine[] = [
    { indent: '', text: '{' },
    {
        indent: '  ',
        key: 'format',
        keyTone: 'required',
        text: ': "trilha/v1",',
    },
    {
        indent: '  ',
        key: 'key',
        keyTone: 'required',
        text: ': "laravel-parte-1",',
    },
    {
        indent: '  ',
        key: 'title',
        keyTone: 'required',
        text: ': "Laravel Backend · Parte 1",',
    },
    {
        indent: '  ',
        key: 'sections',
        keyTone: 'required',
        text: ': [{',
    },
    {
        indent: '    ',
        key: 'key',
        keyTone: 'required',
        text: ': "banco-de-dados",',
    },
    {
        indent: '    ',
        key: 'title',
        keyTone: 'required',
        text: ': "Banco de Dados",',
    },
    {
        indent: '    ',
        key: 'groups',
        keyTone: 'required',
        text: ': [{',
    },
    {
        indent: '      ',
        key: 'key',
        keyTone: 'required',
        text: ': "performance",',
    },
    {
        indent: '      ',
        key: 'title',
        keyTone: 'required',
        text: ': "Performance",',
    },
    {
        indent: '      ',
        key: 'topics',
        keyTone: 'required',
        text: ': [{',
    },
    {
        indent: '        ',
        key: 'key',
        keyTone: 'required',
        text: ': "problema-n-mais-1",',
    },
    {
        indent: '        ',
        key: 'title',
        keyTone: 'required',
        text: ': "Problema N+1",',
    },
    {
        indent: '        ',
        key: 'summary',
        keyTone: 'optional',
        text: ': "…",',
    },
    {
        indent: '        ',
        key: 'checklist',
        keyTone: 'optional',
        text: ': ["…"],',
    },
    {
        indent: '        ',
        key: 'signals',
        keyTone: 'optional',
        text: ': { "bad": "…", "good": "…" },',
    },
    {
        indent: '        ',
        key: 'ai_prompt',
        keyTone: 'optional',
        text: ': "…",',
    },
    {
        indent: '        ',
        key: 'review_checks',
        keyTone: 'optional',
        text: ': ["…"],',
    },
    {
        indent: '        ',
        key: 'exercise',
        keyTone: 'optional',
        text: ': "…",',
    },
    {
        indent: '        ',
        key: 'sources',
        keyTone: 'optional',
        text: ': [{ "title": "…", "url": "…" }]',
    },
    { indent: '      ', text: '}]' },
    { indent: '    ', text: '}]' },
    { indent: '  ', text: '}]' },
    { indent: '', text: '}' },
];

export const ROADMAP_FORMAT_INSTRUCTIONS =
    'Gere um arquivo JSON no formato trilha/v1. A raiz tem format (sempre "trilha/v1"), key, title e sections. Cada seção tem key, title e groups; cada grupo tem key, title e topics; cada tópico tem key e title. Campos opcionais do tópico: summary, checklist, signals (bad e good), ai_prompt, review_checks, exercise e sources (title e url). Use chaves em kebab-case, únicas em cada nível. Responda apenas com o JSON.';
