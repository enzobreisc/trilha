import { Head } from '@inertiajs/react';
import type { HomeProgress } from '@/components/home/types';
import { useChrome, useToday } from '@/hooks/use-chrome';
import { useTranslation } from '@/hooks/use-translation';
import { weekdayIndexOf } from '@/lib/dates';
import { greetingKeyFor } from '@/lib/greeting';

export function HomeHeading({ progress }: { progress: HomeProgress }) {
    const { t, shortDate, weekdayShort } = useTranslation();
    const { profileName } = useChrome();
    const today = useToday();
    const title = t(greetingKeyFor(new Date().getHours()), {
        name: profileName,
    });
    const dateLabel = `${weekdayShort(weekdayIndexOf(today))}, ${shortDate(today)}`;
    const progressLabel = t(':done/:total concluídos', {
        done: progress.done,
        total: progress.total,
    });

    return (
        <header className="flex flex-col gap-1.5">
            <Head title={title} />
            <p className="font-mono text-xs text-muted">
                {dateLabel} · {progressLabel}
            </p>
            <h1 className="text-[28px] leading-9 font-semibold tracking-tight text-text">
                {title}
            </h1>
        </header>
    );
}
