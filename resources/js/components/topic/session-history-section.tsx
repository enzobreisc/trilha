import { Link } from '@inertiajs/react';
import {
    formatDuration,
    getTotalMinutes,
} from '@/components/topic/session-time';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import type { TopicSession } from '@/lib/sample/topic';

const SESSIONS_ROUTE = '/sessions';

export function SessionHistorySection({
    sessions,
    onRegister,
}: {
    sessions: TopicSession[];
    onRegister: () => void;
}) {
    const { t, plural } = useTranslation();

    return (
        <Card
            title={t('sessões')}
            aside={`${formatDuration(getTotalMinutes(sessions))} · ${plural(sessions.length, 'sessão', 'sessões')}`}
        >
            <ul className="m-0 flex list-none flex-col gap-1 p-0">
                {sessions.map((session) => (
                    <li key={session.id}>
                        <Link
                            href={SESSIONS_ROUTE}
                            className="flex items-center justify-between gap-4 rounded-sm px-3 py-3 transition-colors hover:bg-active/60"
                        >
                            <span className="flex min-w-0 flex-col gap-0.5">
                                <span className="truncate text-sm font-semibold text-text">
                                    {session.title}
                                </span>
                                <span className="text-xs font-medium text-muted">
                                    {session.day} {session.time} ·{' '}
                                    {session.activity}
                                </span>
                            </span>
                            <span className="font-mono text-sm font-semibold text-text">
                                {formatDuration(session.minutes)}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
            <Button
                variant="secondary"
                className="self-start"
                onClick={onRegister}
            >
                {t('Registrar sessão')}
            </Button>
        </Card>
    );
}
