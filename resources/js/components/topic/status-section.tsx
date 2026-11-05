import { StatusOption } from '@/components/topic/status-option';
import { TopicSection } from '@/components/topic/topic-section';
import { useTranslation } from '@/hooks/use-translation';
import type { TranslationKey } from '@/lib/i18n';
import type { TopicStatus } from '@/types/topic';

const STATUS_OPTIONS: { status: TopicStatus; label: TranslationKey }[] = [
    { status: 'todo', label: 'a fazer' },
    { status: 'studying', label: 'estudando' },
    { status: 'review', label: 'revisar' },
    { status: 'done', label: 'concluído' },
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
            <fieldset className="m-0 flex min-w-0 flex-wrap gap-x-6 gap-y-2 border-0 p-0">
                <legend className="sr-only">{t('status')}</legend>
                {STATUS_OPTIONS.map((option) => (
                    <StatusOption
                        key={option.status}
                        status={option.status}
                        label={t(option.label)}
                        isChecked={status === option.status}
                        onSelect={() => onStatusChange(option.status)}
                    />
                ))}
            </fieldset>
            <p className="m-0 font-mono text-xs text-muted">
                {t(
                    'Marque concluído quando conseguir implementar sem consultar. As revisões de 7 e 30 dias são agendadas nesse momento.',
                )}
            </p>
        </TopicSection>
    );
}
