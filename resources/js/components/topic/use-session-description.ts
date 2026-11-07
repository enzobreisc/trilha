import { SESSION_ACTIVITY_OPTIONS } from '@/components/session/options';
import type { TopicSession } from '@/components/topic/types';
import { useTranslation } from '@/hooks/use-translation';

export function useSessionDescription(): (session: TopicSession) => string {
    const { t } = useTranslation();

    return (session) =>
        session.note ||
        SESSION_ACTIVITY_OPTIONS.filter((option) =>
            session.activities.includes(option.id),
        )
            .map((option) => t(option.label))
            .join(' · ');
}
