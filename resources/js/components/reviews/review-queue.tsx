import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import { ReviewQueueRow } from './review-queue-row';
import type { ReviewItem, ReviewResults } from './types';

export function ReviewQueue({
    items,
    results,
    selectedId,
    onSelect,
}: {
    items: ReviewItem[];
    results: ReviewResults;
    selectedId?: string;
    onSelect: (id: string) => void;
}) {
    const { t } = useTranslation();

    return (
        <Card title={t('fila de hoje')} aside={items.length}>
            <div className="flex flex-col gap-1">
                {items.map((item) => (
                    <ReviewQueueRow
                        key={item.id}
                        item={item}
                        outcome={results[item.id]}
                        isSelected={item.id === selectedId}
                        onSelect={() => onSelect(item.id)}
                    />
                ))}
            </div>
        </Card>
    );
}
