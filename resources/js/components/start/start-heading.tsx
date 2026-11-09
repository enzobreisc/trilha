import { Head } from '@inertiajs/react';
import { useTranslation } from '@/hooks/use-translation';
import { weekdayIndexOf } from '@/lib/dates';

export function StartHeading({ today }: { today: string }) {
    const { t, shortDate, weekdayShort } = useTranslation();
    const title = t('Roadmaps');

    return (
        <header className="flex flex-col gap-1.5">
            <Head title={title} />
            <p className="font-mono text-xs text-muted">
                {weekdayShort(weekdayIndexOf(today))}, {shortDate(today)} ·{' '}
                {t('escolha um para abrir o Início dele')}
            </p>
            <h1 className="text-[28px] leading-9 font-semibold tracking-tight text-text">
                {title}
            </h1>
        </header>
    );
}
