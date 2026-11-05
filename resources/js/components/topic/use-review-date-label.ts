import { useTranslation } from '@/hooks/use-translation';
import type { TopicStatus } from '@/types/topic';

export function useReviewDateLabel(
    status: TopicStatus,
): (date: string) => string {
    const { t } = useTranslation();

    return (date) => (status === 'done' ? date : t('ao concluir'));
}
