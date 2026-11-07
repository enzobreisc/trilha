export type FormatKeyTone = 'required' | 'optional';

export type FormatExampleLine = {
    indent: string;
    key?: string;
    keyTone?: FormatKeyTone;
    text: string;
};

export const FORMAT_EXAMPLE: FormatExampleLine[] = [
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

export const FORMAT_INSTRUCTIONS =
    'Gere um arquivo JSON no formato trilha/v1. A raiz tem format (sempre "trilha/v1"), key, title e sections. Cada seção tem key, title e groups; cada grupo tem key, title e topics; cada tópico tem key e title. Campos opcionais do tópico: summary, checklist, signals (bad e good), ai_prompt, review_checks, exercise e sources (title e url). Use chaves em kebab-case, únicas em cada nível. Responda apenas com o JSON.';
