import { ActiveTopicSection } from '@/components/home/active-topic-section';
import { HomeHeading } from '@/components/home/home-heading';
import { NoTopicSection } from '@/components/home/no-topic-section';
import { ReviewsPanel } from '@/components/home/reviews-panel';
import type { HomeData } from '@/components/home/types';
import { WeekPanel } from '@/components/home/week-panel';
import { useSessionDialog } from '@/components/session/session-dialog-provider';

export default function Home({
    roadmapName,
    stats,
    progress,
    currentTopic,
    completedTopicTitle,
    nextTopic,
    reviews,
}: HomeData) {
    const openSessionDialog = useSessionDialog();

    return (
        <div className="@container mx-auto flex w-full max-w-6xl flex-col gap-7">
            <HomeHeading progress={progress} />
            <div className="grid grid-cols-1 items-start gap-7 @4xl:grid-cols-[minmax(0,1fr)_20rem]">
                <div className="flex min-w-0 flex-col gap-7">
                    {currentTopic ? (
                        <ActiveTopicSection
                            roadmapName={roadmapName}
                            topic={currentTopic}
                            onRegisterSession={() =>
                                openSessionDialog({ topicId: currentTopic.id })
                            }
                        />
                    ) : (
                        <NoTopicSection
                            completedTopicTitle={completedTopicTitle}
                            nextTopic={nextTopic}
                        />
                    )}
                </div>
                <aside className="flex min-w-0 flex-col gap-7">
                    <ReviewsPanel reviews={reviews} />
                    <WeekPanel stats={stats} />
                </aside>
            </div>
        </div>
    );
}
