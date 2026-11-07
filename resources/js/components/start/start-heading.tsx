import { Head } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';
import { weekdayIndexOf } from '@/lib/dates';
import { greetingKeyFor } from '@/lib/greeting';

export function StartHeading({
    today,
    profileName,
}: {
    today: string;
    profileName: string;
}) {
    const { t, shortDate, weekdayShort } = useTranslation();
    const greeting = t(greetingKeyFor(new Date().getHours()), {
        name: profileName,
    });

    return (
        <header className="flex flex-col gap-1.5">
            <Head title={greeting} />
            <p className="font-mono text-xs text-muted">
                {greeting} · {weekdayShort(weekdayIndexOf(today))},{' '}
                {shortDate(today)}
            </p>
            <h1 className="text-[28px] leading-9 font-semibold tracking-tight text-text">
                {t('O que você vai estudar agora?')}
            </h1>
        </header>
    );
}
