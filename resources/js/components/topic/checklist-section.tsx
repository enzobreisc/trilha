import { TopicSection } from '@/components/topic/topic-section';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

export function ChecklistSection({
    items,
    checkedItems,
    onToggle,
}: {
    items: string[];
    checkedItems: Set<number>;
    onToggle: (index: number) => void;
}) {
    const { t } = useTranslation();
    const checkedCount = checkedItems.size;

    return (
        <TopicSection
            title={t('o que dominar')}
            aside={`${checkedCount}/${items.length}`}
        >
            <progress
                aria-label={t('o que dominar')}
                value={checkedCount}
                max={items.length}
                className="h-1 w-full appearance-none overflow-hidden bg-active [&::-moz-progress-bar]:bg-accent [&::-webkit-progress-bar]:bg-active [&::-webkit-progress-value]:bg-accent"
            />
            <ul className="m-0 flex list-none flex-col gap-1 p-0">
                {items.map((item, index) => {
                    const isChecked = checkedItems.has(index);
                    return (
                        <li key={item}>
                            <label className="flex cursor-pointer items-baseline gap-3 py-1 text-sm transition-colors has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => onToggle(index)}
                                    className="sr-only"
                                />
                                <span
                                    aria-hidden="true"
                                    className={cn(
                                        'font-mono',
                                        isChecked
                                            ? 'text-accent'
                                            : 'text-faint',
                                    )}
                                >
                                    {isChecked ? '[x]' : '[ ]'}
                                </span>
                                <span
                                    className={
                                        isChecked
                                            ? 'text-muted line-through'
                                            : 'text-text'
                                    }
                                >
                                    {item}
                                </span>
                            </label>
                        </li>
                    );
                })}
            </ul>
        </TopicSection>
    );
}
