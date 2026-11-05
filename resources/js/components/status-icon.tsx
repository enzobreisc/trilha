import type { ReactNode } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import type { TranslationKey } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import type { TopicStatus } from '@/types/topic';

export const TOPIC_STATUS_LABEL_KEYS: Record<TopicStatus, TranslationKey> = {
    todo: 'a fazer',
    studying: 'estudando',
    done: 'concluído',
    review: 'revisar',
};

const STATUS_GLYPHS: Record<
    TopicStatus,
    { className: string; shapes: ReactNode }
> = {
    todo: {
        className: 'text-faint',
        shapes: (
            <circle
                cx="8"
                cy="8"
                r="6.25"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
            />
        ),
    },
    studying: {
        className: 'text-accent',
        shapes: (
            <>
                <circle
                    cx="8"
                    cy="8"
                    r="6.25"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                />
                <path d="M8 1.75a6.25 6.25 0 0 1 0 12.5z" fill="currentColor" />
            </>
        ),
    },
    review: {
        className: 'text-warn',
        shapes: <path d="M8 1.5 14.5 8 8 14.5 1.5 8z" fill="currentColor" />,
    },
    done: {
        className: 'text-accent',
        shapes: (
            <>
                <circle cx="8" cy="8" r="7" fill="currentColor" />
                <path
                    d="M5 8.25l2 2 4-4.25"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-bg"
                />
            </>
        ),
    },
};

export function StatusIcon({
    status,
    size = 12,
}: {
    status: TopicStatus;
    size?: number;
}) {
    const { t } = useTranslation();
    const { className, shapes } = STATUS_GLYPHS[status];

    return (
        <svg
            role="img"
            aria-label={t(TOPIC_STATUS_LABEL_KEYS[status])}
            width={size}
            height={size}
            viewBox="0 0 16 16"
            className={cn('shrink-0', className)}
        >
            {shapes}
        </svg>
    );
}
