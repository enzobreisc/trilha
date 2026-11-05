import { Fragment } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';
import type { ContributionDay, HeatLevel } from '@/types/contribution';

const DAYS_PER_WEEK = 7;

const LABELED_WEEK_ROWS = [0, 2, 4];

const HEAT_CLASSES: Record<HeatLevel, string> = {
    0: 'bg-heat-0',
    1: 'bg-heat-1',
    2: 'bg-heat-2',
    3: 'bg-heat-3',
    4: 'bg-heat-4',
};

const LEGEND_LEVELS: HeatLevel[] = [0, 1, 2, 3, 4];

type WeekCell = ContributionDay | null;

function parseDate(date: string): Date {
    return new Date(`${date}T00:00:00`);
}

function mondayFirstRowOf(date: string): number {
    return (parseDate(date).getDay() + 6) % DAYS_PER_WEEK;
}

function toWeeks(days: ContributionDay[]): WeekCell[][] {
    const leadingBlanks = days.length > 0 ? mondayFirstRowOf(days[0].date) : 0;
    const cells: WeekCell[] = [
        ...Array.from({ length: leadingBlanks }, (): WeekCell => null),
        ...days,
    ];

    const weeks: WeekCell[][] = [];
    for (let start = 0; start < cells.length; start += DAYS_PER_WEEK) {
        weeks.push(
            Array.from(
                { length: DAYS_PER_WEEK },
                (_, row): WeekCell => cells[start + row] ?? null,
            ),
        );
    }
    return weeks;
}

function monthLabelsOf(
    weeks: WeekCell[][],
    monthShort: (monthIndex: number) => string,
): (string | null)[] {
    let previousMonth = -1;
    return weeks.map((week) => {
        const firstDay = week.find((day) => day !== null);
        if (!firstDay) {
            return null;
        }
        const month = parseDate(firstDay.date).getMonth();
        if (month === previousMonth) {
            return null;
        }
        previousMonth = month;
        return monthShort(month);
    });
}

export function ContributionGraph({
    days,
    className,
}: {
    days: ContributionDay[];
    className?: string;
}) {
    const { t, longDate, monthShort, weekdayShort } = useTranslation();
    const weeks = toWeeks(days);
    const monthLabels = monthLabelsOf(weeks, monthShort);

    return (
        <div className={cn('flex flex-col gap-3', className)}>
            <div className="overflow-x-auto">
                <div
                    role="img"
                    aria-label={t('Gráfico de contribuições: dias estudados')}
                    className="grid min-w-160 gap-1"
                    style={{
                        gridTemplateColumns: `auto repeat(${weeks.length}, minmax(0, 1fr))`,
                    }}
                >
                    <span />
                    {monthLabels.map((label, weekIndex) => (
                        <span
                            key={weekIndex}
                            className="relative h-3 font-mono text-[11px] leading-none text-faint"
                        >
                            {label && (
                                <span className="absolute left-0 whitespace-nowrap">
                                    {label}
                                </span>
                            )}
                        </span>
                    ))}
                    {Array.from({ length: DAYS_PER_WEEK }, (_, row) => (
                        <Fragment key={row}>
                            <span className="flex items-center pr-2 font-mono text-[11px] leading-none text-faint">
                                {LABELED_WEEK_ROWS.includes(row)
                                    ? weekdayShort((row + 1) % DAYS_PER_WEEK)
                                    : ''}
                            </span>
                            {weeks.map((week, weekIndex) => {
                                const day = week[row];
                                if (!day) {
                                    return (
                                        <span
                                            key={`blank-${weekIndex}-${row}`}
                                            className="aspect-square"
                                        />
                                    );
                                }
                                return (
                                    <span
                                        key={day.date}
                                        title={longDate(day.date)}
                                        className={cn(
                                            'aspect-square rounded-xs',
                                            HEAT_CLASSES[day.level],
                                        )}
                                    />
                                );
                            })}
                        </Fragment>
                    ))}
                </div>
            </div>
            <div className="flex items-center justify-end gap-1 font-mono text-[11px] text-muted">
                <span className="mr-1.5">{t('menos')}</span>
                {LEGEND_LEVELS.map((level) => (
                    <span
                        key={level}
                        className={cn('size-3 rounded-xs', HEAT_CLASSES[level])}
                    />
                ))}
                <span className="ml-1.5">{t('mais')}</span>
            </div>
        </div>
    );
}
