import type { TopicChecklistItem } from '@/components/home/types';
import { SectionTitle } from '@/components/ui/page-header';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

const PROGRESS_BAR_CLASSES =
    'h-1.5 w-full appearance-none overflow-hidden rounded-full bg-active [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-active [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-accent [&::-moz-progress-bar]:rounded-full [&::-moz-progress-bar]:bg-accent';

export function TopicChecklist({ items }: { items: TopicChecklistItem[] }) {
    const { t } = useTranslation();
    const doneCount = items.filter((item) => item.isDone).length;

    return (
        <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
                <SectionTitle>{t('o que dominar')}</SectionTitle>
                <span className="font-mono text-xs text-muted">
                    {doneCount}/{items.length}
                </span>
            </div>
            <progress
                aria-label={t('o que dominar')}
                className={PROGRESS_BAR_CLASSES}
                value={doneCount}
                max={items.length}
            />
            <ul className="-mx-2 flex flex-col gap-1">
                {items.map((item) => (
                    <li key={item.label}>
                        <label className="flex items-start gap-3 rounded-sm px-2 py-2">
                            <input
                                type="checkbox"
                                checked={item.isDone}
                                readOnly
                                className="mt-0.5 size-4 shrink-0 accent-accent"
                            />
                            <span
                                className={cn(
                                    'text-sm font-medium',
                                    item.isDone
                                        ? 'text-faint line-through'
                                        : 'text-text',
                                )}
                            >
                                {item.label}
                            </span>
                        </label>
                    </li>
                ))}
            </ul>
        </section>
    );
}
