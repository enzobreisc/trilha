import { FieldCaption } from '@/components/session/field-caption';
import { formatSessionDuration } from '@/components/session/session-draft';
import { SegmentedControl } from '@/components/session/segmented-control';
import { useTranslation } from '@/hooks/use-translation';

export function DurationField({
    options,
    value,
    onChange,
}: {
    options: number[];
    value: number;
    onChange: (durationMinutes: number) => void;
}) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-1.5">
            <FieldCaption>{t('duração')}</FieldCaption>
            <SegmentedControl
                label={t('duração')}
                options={options.map((minutes) => ({
                    value: minutes,
                    label: formatSessionDuration(minutes),
                }))}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}
