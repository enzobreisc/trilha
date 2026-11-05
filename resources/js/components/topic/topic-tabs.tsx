import { useTranslation } from '@/hooks/use-translation';
import type { TranslationKey } from '@/lib/i18n';
import type { TopicDetail } from '@/lib/sample/topic';
import { cn } from '@/lib/utils';
import type { TopicState } from '@/components/topic/use-topic-state';

export type TopicTab = 'study' | 'history';

export type TopicTabProps = {
    topic: TopicDetail;
    state: TopicState;
    onRegisterSession: () => void;
};

const TABS: { id: TopicTab; label: TranslationKey }[] = [
    { id: 'study', label: 'estudo' },
    { id: 'history', label: 'histórico' },
];

export function TopicTabs({
    activeTab,
    onTabChange,
}: {
    activeTab: TopicTab;
    onTabChange: (tab: TopicTab) => void;
}) {
    const { t } = useTranslation();

    return (
        <div
            role="tablist"
            aria-label={t('Seções do tópico')}
            className="flex w-fit gap-1 rounded-full bg-surface p-1 inset-ring inset-ring-border"
        >
            {TABS.map((tab) => {
                const isActive = tab.id === activeTab;
                return (
                    <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => onTabChange(tab.id)}
                        className={cn(
                            'h-9 rounded-full px-4 text-sm font-semibold transition-colors',
                            isActive
                                ? 'bg-active text-text'
                                : 'text-muted hover:text-secondary',
                        )}
                    >
                        {t(tab.label)}
                    </button>
                );
            })}
        </div>
    );
}
