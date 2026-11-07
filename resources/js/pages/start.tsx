import { ActivitySection } from '@/components/start/activity-section';
import { ContributionsSection } from '@/components/start/contributions-section';
import { findLastStudiedRoadmap } from '@/components/start/find-last-studied';
import { ReviewsSection } from '@/components/start/reviews-section';
import { RoadmapsSection } from '@/components/start/roadmaps-section';
import { StartHeading } from '@/components/start/start-heading';
import type { StartPageData } from '@/components/start/types';
import { WelcomeEmptyState } from '@/components/welcome/welcome-empty-state';
import { useChrome, useToday } from '@/hooks/use-chrome';

export default function Start({
    roadmaps,
    archivedRoadmaps,
    reviews,
    activity,
    contributionDays,
    stats,
}: StartPageData) {
    const today = useToday();
    const { profileName, reviewsDue } = useChrome();

    if (roadmaps.length === 0 && archivedRoadmaps.length === 0) {
        return <WelcomeEmptyState />;
    }

    const lastStudied = findLastStudiedRoadmap(roadmaps);

    return (
        <div className="@container mx-auto flex w-full max-w-6xl flex-col gap-7">
            <StartHeading today={today} profileName={profileName} />
            <div className="grid items-start gap-7 @4xl:grid-cols-[minmax(0,1fr)_20rem]">
                <RoadmapsSection
                    roadmaps={roadmaps}
                    archivedRoadmaps={archivedRoadmaps}
                    lastStudiedId={lastStudied?.id}
                />
                <aside className="flex min-w-0 flex-col gap-6">
                    <ActivitySection entries={activity} today={today} />
                    <ReviewsSection reviews={reviews} dueCount={reviewsDue} />
                    <ContributionsSection
                        levels={contributionDays.map((day) => day.level)}
                        stats={stats}
                    />
                </aside>
            </div>
        </div>
    );
}
