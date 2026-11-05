import { useState } from 'react';
import LogSessionDialog from '@/components/log-session-dialog';
import { HistoryTab } from '@/components/topic/history-tab';
import { StudyTab } from '@/components/topic/study-tab';
import { TopicHeader } from '@/components/topic/topic-header';
import { TopicTabs, type TopicTab } from '@/components/topic/topic-tabs';
import { useTopicState } from '@/components/topic/use-topic-state';
import { type TopicDetail, sampleTopicDetail } from '@/lib/sample/topic';

type TopicShowProps = {
    topicKey: string;
    topic?: TopicDetail;
};

export default function TopicShow({
    topicKey,
    topic = sampleTopicDetail,
}: TopicShowProps) {
    const state = useTopicState(topic);
    const [activeTab, setActiveTab] = useState<TopicTab>('study');
    const [isSessionDialogOpen, setIsSessionDialogOpen] = useState(false);
    const openSessionDialog = () => setIsSessionDialogOpen(true);

    return (
        <>
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-7">
                <TopicHeader topic={topic} />
                <TopicTabs activeTab={activeTab} onTabChange={setActiveTab} />
                {activeTab === 'study' ? (
                    <StudyTab
                        topic={topic}
                        state={state}
                        onRegisterSession={openSessionDialog}
                    />
                ) : (
                    <HistoryTab
                        topic={topic}
                        state={state}
                        onRegisterSession={openSessionDialog}
                    />
                )}
            </div>
            <LogSessionDialog
                open={isSessionDialogOpen}
                onClose={() => setIsSessionDialogOpen(false)}
                defaultTopicKey={topicKey}
            />
        </>
    );
}
