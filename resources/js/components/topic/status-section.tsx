import { StatusOption } from '@/components/topic/status-option';
import { TopicSection } from '@/components/topic/topic-section';
import { useTranslation } from '@/hooks/use-translation';
import type { TranslationKey } from '@/lib/i18n';
import type { TopicStatus } from '@/types/topic';

const STATUS_OPTIONS: {
    status: TopicStatus;
    label: TranslationKey;
    description: TranslationKey;
}[] = [
    {
        status: 'todo',
        label: 'a fazer',
        description: 'Ainda não comecei.',
    },
    {
        status: 'studying',
        label: 'estudando',
        description: 'Em andamento. Registre sessões e marque o checklist.',
    },
    {
        status: 'review',
        label: 'revisar',
        description: 'Preciso rever; entra na fila de revisões.',
    },
    {
        status: 'done',
        label: 'concluído',
        description:
            'Consigo implementar sem consultar. Agenda as revisões de 7 e 30 dias.',
    },
];

export function StatusSection({
    status,
    onStatusChange,
}: {
    status: TopicStatus;
    onStatusChange: (status: TopicStatus) => void;
}) {
    const { t } = useTranslation();

    return (
        <TopicSection title={t('status')}>
            <fieldset className="m-0 flex min-w-0 flex-col gap-1.5 border-0 p-0">
                <legend className="sr-only">{t('status')}</legend>
                {STATUS_OPTIONS.map((option) => (
                    <StatusOption
                        key={option.status}
                        status={option.status}
                        label={t(option.label)}
                        description={t(option.description)}
                        isChecked={status === option.status}
                        onSelect={() => onStatusChange(option.status)}
                    />
                ))}
            </fieldset>
        </TopicSection>
    );
}
