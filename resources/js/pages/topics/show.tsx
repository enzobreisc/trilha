import { useState } from 'react';
import { useSessionDialog } from '@/components/session/session-dialog-provider';
import { HistoryTab } from '@/components/topic/history-tab';
import { StudyTab } from '@/components/topic/study-tab';
import { TopicHeader } from '@/components/topic/topic-header';
import { TopicTabs, type TopicTab } from '@/components/topic/topic-tabs';
import type { TopicDetail } from '@/components/topic/types';
import { useTopicState } from '@/components/topic/use-topic-state';

export default function TopicShow({ topic }: { topic: TopicDetail }) {
    return <TopicView key={topic.id} topic={topic} />;
}

function TopicView({ topic }: { topic: TopicDetail }) {
    const state = useTopicState(topic);
    const [activeTab, setActiveTab] = useState<TopicTab>('study');
    const openSessionDialog = useSessionDialog();
    const registerSession = () => openSessionDialog({ topicId: topic.id });

    return (
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-7">
            <TopicHeader topic={topic} />
            <TopicTabs activeTab={activeTab} onTabChange={setActiveTab} />
            {activeTab === 'study' ? (
                <StudyTab
                    topic={topic}
                    state={state}
                    onRegisterSession={registerSession}
                />
            ) : (
                <HistoryTab
                    topic={topic}
                    state={state}
                    onRegisterSession={registerSession}
                />
            )}
        </div>
    );
}
