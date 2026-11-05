import type { TopicChecklistItem } from '@/components/home/types';
import { Section } from '@/components/start/section';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

export function TopicChecklist({ items }: { items: TopicChecklistItem[] }) {
    const { t } = useTranslation();
    const doneCount = items.filter((item) => item.isDone).length;

    return (
        <Section
            title={t('o que dominar')}
            aside={`${doneCount}/${items.length}`}
        >
            <ul className="-mx-2 flex flex-col">
                {items.map((item) => (
                    <li key={item.label}>
                        <label className="flex items-start gap-3 rounded-xs px-2 py-1.5">
                            <input
                                type="checkbox"
                                checked={item.isDone}
                                readOnly
                                className="mt-1 size-3.5 shrink-0 accent-accent"
                            />
                            <span
                                className={cn(
                                    'text-sm font-medium',
                                    item.isDone
                                        ? 'text-muted line-through'
                                        : 'text-text',
                                )}
                            >
                                {item.label}
                            </span>
                        </label>
                    </li>
                ))}
            </ul>
        </Section>
    );
}
