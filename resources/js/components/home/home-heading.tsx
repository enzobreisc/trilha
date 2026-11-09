import { Head } from '@inertiajs/react';
import { useChrome, useToday } from '@/hooks/use-chrome';
import { useTranslation } from '@/hooks/use-translation';
import { weekdayIndexOf } from '@/lib/dates';
import { greetingKeyFor } from '@/lib/greeting';

export function HomeHeading({ roadmapName }: { roadmapName: string }) {
    const { t, shortDate, weekdayShort } = useTranslation();
    const { profileName } = useChrome();
    const today = useToday();
    const title = t('O que fazer hoje');
    const greeting = t(greetingKeyFor(new Date().getHours()), {
        name: profileName,
    });
    const dateLabel = `${weekdayShort(weekdayIndexOf(today))}, ${shortDate(today)}`;

    return (
        <header className="flex flex-col gap-1.5">
            <Head title={title} />
            <p className="font-mono text-xs text-muted">
                {greeting} · {dateLabel} · {roadmapName}
            </p>
            <h1 className="text-[28px] leading-9 font-semibold tracking-tight text-text">
                {title}
            </h1>
        </header>
    );
}
