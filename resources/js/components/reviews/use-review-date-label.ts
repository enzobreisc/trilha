import { useTranslation } from '@/hooks/use-translation';

export function useReviewDateLabel() {
    const { weekdayShort, shortDate } = useTranslation();

    return (isoDate: string) =>
        `${weekdayShort(new Date(isoDate).getUTCDay())} ${shortDate(isoDate)}`;
}
