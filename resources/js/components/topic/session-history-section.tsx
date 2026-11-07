import { Link } from '@inertiajs/react';
import {
    formatDuration,
    getTotalMinutes,
} from '@/components/topic/session-time';
import { TopicSection } from '@/components/topic/topic-section';
import type { TopicSession } from '@/components/topic/types';
import { useSessionDescription } from '@/components/topic/use-session-description';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';

const SESSIONS_ROUTE = '/sessions';

export function SessionHistorySection({
    sessions,
    onRegister,
}: {
    sessions: TopicSession[];
    onRegister: () => void;
}) {
    const { t, plural, shortDate } = useTranslation();
    const describe = useSessionDescription();

    return (
        <TopicSection
            title={t('sessões')}
            aside={`${formatDuration(getTotalMinutes(sessions))} · ${plural(sessions.length, 'sessão', 'sessões')}`}
        >
            <ul className="m-0 flex list-none flex-col p-0">
                {sessions.map((session) => (
                    <li key={session.id} className="border-t border-border">
                        <Link
                            href={SESSIONS_ROUTE}
                            className="flex flex-wrap items-baseline gap-x-3.5 gap-y-1 py-2 transition-colors hover:bg-active/60"
                        >
                            <span className="w-28 shrink-0 font-mono text-xs text-muted">
                                {shortDate(session.date)} {session.time}
                            </span>
                            <span className="w-10 shrink-0 font-mono text-[13px] text-text">
                                {formatDuration(session.minutes)}
                            </span>
                            <span className="min-w-0 flex-1 truncate text-sm text-secondary">
                                {describe(session)}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
            <Button className="self-start" onClick={onRegister}>
                {t('Registrar sessão')}
            </Button>
        </TopicSection>
    );
}
