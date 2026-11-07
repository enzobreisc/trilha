import { useId } from 'react';
import { FieldCaption } from '@/components/session/field-caption';
import type { SegmentedOption } from '@/components/session/segmented-control';
import { SegmentedControl } from '@/components/session/segmented-control';
import type { SessionDay } from '@/components/session/types';
import { useTranslation } from '@/hooks/use-translation';

export function DayField({
    value,
    otherDate,
    maxDate,
    onChange,
    onOtherDateChange,
}: {
    value: SessionDay;
    otherDate: string;
    maxDate: string;
    onChange: (day: SessionDay) => void;
    onOtherDateChange: (date: string) => void;
}) {
    const { t } = useTranslation();
    const dateInputId = useId();
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
            {value === 'other' && (
                <input
                    id={dateInputId}
                    type="date"
                    aria-label={t('outra data…')}
                    value={otherDate}
                    max={maxDate}
                    required
                    onChange={(event) => onOtherDateChange(event.target.value)}
                    className="h-10 w-fit rounded-sm bg-surface px-3 font-mono text-sm text-text inset-ring inset-ring-strong focus:inset-ring-accent"
                />
            )}
        </div>
    );
}
