import type { TranslationKey } from '@/lib/i18n';
import type { ReviewQuestionKey } from './types';

export const REVIEW_QUESTIONS: {
    key: ReviewQuestionKey;
    label: TranslationKey;
}[] = [
    { key: 'explain', label: 'Consigo explicar com minhas palavras?' },
    { key: 'build', label: 'Consigo implementar do zero?' },
    { key: 'solo', label: 'Resolvo sem consultar nada?' },
];

export const REVIEW_HINT_COPY: TranslationKey =
    'Responda as três perguntas com sinceridade. Um "não" já é motivo para rever.';

export const REVIEW_DUE_SUBTITLE: TranslationKey =
    'Todo tópico concluído volta 7 e 30 dias depois. Se travar, ele volta para revisar.';

export const REVIEW_CLOSED_SUBTITLE: TranslationKey =
    'Todo tópico concluído volta 7 e 30 dias depois.';
