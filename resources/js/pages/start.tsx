import { ActivitySection } from '@/components/start/activity-section';
import { ContributionsSection } from '@/components/start/contributions-section';
import { findLastStudiedRoadmap } from '@/components/start/find-last-studied';
import { RoadmapsSection } from '@/components/start/roadmaps-section';
import { StartHeading } from '@/components/start/start-heading';
import type { StartPageData } from '@/components/start/types';
import { WelcomeEmptyState } from '@/components/welcome/welcome-empty-state';
import { useToday } from '@/hooks/use-chrome';

export default function Start({
    roadmaps,
    archivedRoadmaps,
    activity,
    contributionDays,
    stats,
}: StartPageData) {
    const today = useToday();

    if (roadmaps.length === 0 && archivedRoadmaps.length === 0) {
        return <WelcomeEmptyState />;
    }

    const lastStudied = findLastStudiedRoadmap(roadmaps);

    return (
        <div className="@container mx-auto flex w-full max-w-6xl flex-col gap-7">
            <StartHeading today={today} />
            <div className="grid items-start gap-7 @4xl:grid-cols-[minmax(0,1fr)_20rem]">
                <RoadmapsSection
                    roadmaps={roadmaps}
                    archivedRoadmaps={archivedRoadmaps}
                    lastStudiedId={lastStudied?.id}
                />
                <aside className="flex min-w-0 flex-col gap-6">
                    <ActivitySection entries={activity} today={today} />
                    <ContributionsSection
                        levels={contributionDays.map((day) => day.level)}
                        stats={stats}
                    />
                </aside>
            </div>
        </div>
    );
}
