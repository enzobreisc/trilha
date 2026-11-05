import { FieldCaption } from '@/components/session/field-caption';
import type { SegmentedOption } from '@/components/session/segmented-control';
import { SegmentedControl } from '@/components/session/segmented-control';
import type { SessionDay } from '@/components/session/types';
import { useTranslation } from '@/hooks/use-translation';

export function DayField({
    value,
    onChange,
}: {
    value: SessionDay;
    onChange: (day: SessionDay) => void;
}) {
    const { t } = useTranslation();
    const options: SegmentedOption<SessionDay>[] = [
        { value: 'today', label: t('hoje') },
        { value: 'yesterday', label: t('ontem') },
        { value: 'other', label: t('outra data…') },
    ];

    return (
        <div className="flex flex-col gap-1.5">
            <FieldCaption>{t('quando')}</FieldCaption>
            <SegmentedControl
                label={t('quando')}
                options={options}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}
