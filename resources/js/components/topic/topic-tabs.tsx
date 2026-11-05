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
            className="flex gap-6 border-b border-border"
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
                            '-mb-px border-b-2 px-1 pb-2 font-mono text-[13px] transition-colors',
                            isActive
                                ? 'border-accent font-bold text-accent'
                                : 'border-transparent text-muted hover:text-secondary',
                        )}
                    >
                        {t(tab.label)}
                    </button>
                );
            })}
        </div>
    );
}
