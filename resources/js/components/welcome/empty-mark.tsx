import { useTranslation } from '@/hooks/use-translation';

export function EmptyMark() {
    const { t } = useTranslation();

    return (
        <svg
            role="img"
            aria-label={t('Símbolo da trilha ainda apagado')}
            viewBox="0 0 64 64"
            className="size-24"
        >
            <path
                d="M20 58V8"
                className="stroke-strong"
                strokeWidth="5"
                strokeLinecap="round"
            />
            <path
                d="M20 42C20 30 44 34 44 22V12"
                fill="none"
                className="stroke-strong"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="2 8"
            />
            <circle cx="20" cy="50" r="7" className="fill-primary" />
            <circle cx="20" cy="30" r="5" className="fill-strong" />
            <circle
                cx="44"
                cy="12"
                r="8"
                fill="none"
                className="stroke-strong"
                strokeWidth="2"
            />
        </svg>
    );
}
