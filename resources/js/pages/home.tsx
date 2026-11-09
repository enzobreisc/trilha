import { ActiveTopicSection } from '@/components/home/active-topic-section';
import { HomeHeading } from '@/components/home/home-heading';
import { NoTopicSection } from '@/components/home/no-topic-section';
import { ReviewsStep } from '@/components/home/reviews-panel';
import { TrailLink } from '@/components/home/trail-link';
import type { HomeData } from '@/components/home/types';
import { WeekSummary } from '@/components/home/week-summary';
import { useSessionDialog } from '@/components/session/session-dialog-provider';

export default function Home({
    roadmapName,
    stats,
    progress,
    currentTopic,
    completedTopicTitle,
    nextTopic,
    reviews,
    reviewsDueCount,
}: HomeData) {
    const openSessionDialog = useSessionDialog();

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-6">
            <HomeHeading roadmapName={roadmapName} />
            <ReviewsStep reviews={reviews} dueCount={reviewsDueCount} />
            {currentTopic ? (
                <ActiveTopicSection
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
            <TrailLink progress={progress} />
            <WeekSummary stats={stats} />
        </div>
    );
}
