import type { SessionDayGroup } from '@/components/sessions/types';
import { SessionDaySection } from '@/components/sessions/session-day-section';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

export function SessionsListPanel({
    className,
    groups,
    selectedId,
    onSelect,
}: {
    className?: string;
    groups: SessionDayGroup[];
    selectedId: string | undefined;
    onSelect: (sessionId: string) => void;
}) {
    const { t, plural } = useTranslation();
    const sessionCount = groups.reduce(
        (total, group) => total + group.sessions.length,
        0,
    );

    return (
        <Card
            title={t('sessões')}
            aside={plural(sessionCount, 'sessão', 'sessões')}
            className={cn('min-w-0', className)}
        >
            {groups.map((group) => (
                <SessionDaySection
                    key={group.date}
                    group={group}
                    selectedId={selectedId}
                    onSelect={onSelect}
                />
            ))}
        </Card>
    );
}
