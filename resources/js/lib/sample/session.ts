import type {
    SessionActivityOption,
    SessionDraft,
} from '@/components/session/types';

export const sessionDurationOptions: number[] = [25, 50, 90, 120];

export const sessionActivityOptions: SessionActivityOption[] = [
    { id: 'docs', label: 'Li a documentação' },
    { id: 'solo', label: 'Exercício sem IA' },
    { id: 'compare', label: 'Comparei com a IA' },
    { id: 'project', label: 'Apliquei no projeto' },
];

export const sampleSessionDraft: Omit<SessionDraft, 'topicKey'> = {
    day: 'today',
    durationMinutes: 50,
    activities: ['docs'],
    note: 'Entendi a diferença entre with e load.',
};

export const sampleWeekSessionMinutes = 260;
