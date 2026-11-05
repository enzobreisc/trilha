import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';

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
        <Card
            title={t('o que dominar')}
            aside={
                <span className="font-mono text-secondary">
                    {checkedCount}/{items.length}
                </span>
            }
        >
            <progress
                aria-label={t('o que dominar')}
                value={checkedCount}
                max={items.length}
                className="h-1.5 w-full appearance-none overflow-hidden rounded-full bg-active [&::-moz-progress-bar]:bg-accent [&::-webkit-progress-bar]:bg-active [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-accent"
            />
            <ul className="m-0 flex list-none flex-col gap-1 p-0">
                {items.map((item, index) => {
                    const isChecked = checkedItems.has(index);
                    return (
                        <li key={item}>
                            <label className="flex cursor-pointer items-center gap-3 rounded-sm px-3 py-2.5 text-sm transition-colors hover:bg-active/60 has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-accent">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => onToggle(index)}
                                    className="size-4.5 shrink-0 accent-accent"
                                />
                                <span
                                    className={
                                        isChecked
                                            ? 'text-faint line-through'
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
        </Card>
    );
}
