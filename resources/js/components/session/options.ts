import type { SessionActivityOption } from '@/components/session/types';

export const SESSION_DURATION_OPTIONS: number[] = [25, 50, 90, 120];

export const DEFAULT_SESSION_DURATION = 50;

export const SESSION_ACTIVITY_OPTIONS: SessionActivityOption[] = [
    { id: 'docs', label: 'Li a documentação' },
    { id: 'solo', label: 'Exercício sem IA' },
    { id: 'compare', label: 'Comparei com a IA' },
    { id: 'project', label: 'Apliquei no projeto' },
];
