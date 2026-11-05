import { ActivitySection } from '@/components/start/activity-section';
import { findLastStudiedRoadmap } from '@/components/start/find-last-studied';
import { ContributionsSection } from '@/components/start/contributions-section';
import { ReviewsSection } from '@/components/start/reviews-section';
import { RoadmapsSection } from '@/components/start/roadmaps-section';
import { StartHeading } from '@/components/start/start-heading';
import type {
    StartActivityEntry,
    StartReview,
    StartStats,
} from '@/components/start/types';
import { sampleAppChrome, sampleContributionDays } from '@/lib/sample-data';
import {
    sampleRoadmaps,
    sampleStartActivity,
    sampleStartReviews,
    sampleStartStats,
    sampleStartToday,
} from '@/lib/sample/start';
import type { ContributionDay } from '@/types/contribution';
import type { RoadmapSummary } from '@/types/roadmap';

type StartPageProps = {
    roadmaps?: RoadmapSummary[];
    reviews?: StartReview[];
    activity?: StartActivityEntry[];
    contributionDays?: ContributionDay[];
    stats?: StartStats;
};

export default function Start({
    roadmaps = sampleRoadmaps,
    reviews = sampleStartReviews,
    activity = sampleStartActivity,
    contributionDays = sampleContributionDays,
    stats = sampleStartStats,
}: StartPageProps) {
    const lastStudied = findLastStudiedRoadmap(roadmaps);

    return (
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-7">
            <StartHeading
                today={sampleStartToday}
                profileName={sampleAppChrome.profileName}
            />
            <RoadmapsSection
                roadmaps={roadmaps}
                lastStudiedId={lastStudied?.id}
            />
            <div className="grid items-start gap-4 md:grid-cols-2">
                <ReviewsSection reviews={reviews} />
                <ContributionsSection
                    levels={contributionDays.map((day) => day.level)}
                    stats={stats}
                />
            </div>
            <ActivitySection entries={activity} today={sampleStartToday} />
        </div>
    );
}
