import { useState } from 'react';
import { ActiveTopicSection } from '@/components/home/active-topic-section';
import { NoTopicSection } from '@/components/home/no-topic-section';
import { ReviewsPanel } from '@/components/home/reviews-panel';
import type { HomeData } from '@/components/home/types';
import { WeekPanel } from '@/components/home/week-panel';
import LogSessionDialog from '@/components/log-session-dialog';
import { PageHeader } from '@/components/ui/page-header';
import { useTranslation } from '@/hooks/use-translation';
import { sampleHomeData } from '@/lib/sample/home';

export default function Home(props: Partial<HomeData>) {
    const data = { ...sampleHomeData, ...props };
    const currentTopic = data.currentTopic ?? null;
    const { t } = useTranslation();
    const [isSessionDialogOpen, setIsSessionDialogOpen] = useState(false);

    return (
        <div className="@container mx-auto flex w-full max-w-6xl flex-col gap-7">
            <PageHeader
                title={t('Boa noite, :name', { name: data.profileName })}
                description={`${data.dateLabel} · ${t(':done/:total concluídos', { done: data.progress.done, total: data.progress.total })}`}
            />
            <div className="grid grid-cols-1 items-start gap-7 @4xl:grid-cols-[minmax(0,1fr)_20rem]">
                <div className="flex min-w-0 flex-col gap-7">
                    {currentTopic ? (
                        <ActiveTopicSection
                            roadmapName={data.roadmapName}
                            topic={currentTopic}
                            onRegisterSession={() =>
                                setIsSessionDialogOpen(true)
                            }
                        />
                    ) : (
                        <NoTopicSection
                            completedTopicTitle={data.completedTopicTitle}
                            nextTopic={data.nextTopic}
                        />
                    )}
                </div>
                <aside className="flex min-w-0 flex-col gap-7">
                    <ReviewsPanel reviews={data.reviews} />
                    <WeekPanel stats={data.stats} />
                </aside>
            </div>
            <LogSessionDialog
                open={isSessionDialogOpen}
                onClose={() => setIsSessionDialogOpen(false)}
                defaultTopicKey={currentTopic?.id}
            />
        </div>
    );
}
