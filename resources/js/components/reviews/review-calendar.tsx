import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import { ReviewCalendarDay } from './review-calendar-day';
import type { ReviewDay } from './types';

export function ReviewCalendar({
    days,
    todayCount,
}: {
    days: ReviewDay[];
    todayCount: number;
}) {
    const { t } = useTranslation();
    const getDayCount = (day: ReviewDay) =>
        day.isToday ? todayCount : day.count;
    const maxCount = Math.max(1, ...days.map(getDayCount));

    return (
        <Card title={t('Revisões agendadas nos próximos 14 dias')}>
            <div className="grid grid-cols-14 gap-2">
                {days.map((day) => (
                    <ReviewCalendarDay
                        key={day.date}
                        day={day}
                        count={getDayCount(day)}
                        maxCount={maxCount}
                    />
                ))}
            </div>
        </Card>
    );
}
