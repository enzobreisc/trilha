import { useState } from 'react';
import {
    REVIEW_CLOSED_SUBTITLE,
    REVIEW_DUE_SUBTITLE,
} from '@/components/reviews/copy';
import {
    ALL_ROADMAPS_FILTER,
    findReviewRoadmaps,
} from '@/components/reviews/find-review-roadmaps';
import { ReviewCalendar } from '@/components/reviews/review-calendar';
import { ReviewEmpty } from '@/components/reviews/review-empty';
import { ReviewPanel } from '@/components/reviews/review-panel';
import { ReviewQueue } from '@/components/reviews/review-queue';
import { ReviewRoadmapFilter } from '@/components/reviews/review-roadmap-filter';
import { ReviewStats } from '@/components/reviews/review-stats';
import { ReviewSummary } from '@/components/reviews/review-summary';
import { ReviewUpcoming } from '@/components/reviews/review-upcoming';
import {
    countOutcome,
    countPending,
    deriveReviewView,
} from '@/components/reviews/review-view';
import type {
    ReviewDay,
    ReviewItem,
    UpcomingReview,
} from '@/components/reviews/types';
import { useReviewHotkeys } from '@/components/reviews/use-review-hotkeys';
import { useReviewSession } from '@/components/reviews/use-review-session';
import { PageHeader } from '@/components/ui/page-header';
import { useTranslation } from '@/hooks/use-translation';

const NEXT_WEEK_DAY_RANGE = { start: 1, end: 7 };

type ReviewsPageProps = {
    items: ReviewItem[];
    days: ReviewDay[];
    upcoming: UpcomingReview[];
};

export default function Reviews({ items, days, upcoming }: ReviewsPageProps) {
    const { t } = useTranslation();
    const [roadmapFilter, setRoadmapFilter] =
        useState<string>(ALL_ROADMAPS_FILTER);
    const roadmaps = findReviewRoadmaps(items);
    const visibleItems =
        roadmapFilter === ALL_ROADMAPS_FILTER
            ? items
            : items.filter((item) => item.roadmapId === roadmapFilter);
    const session = useReviewSession(visibleItems);
    const view = deriveReviewView(visibleItems, session.results);
    const pendingCount = countPending(visibleItems, session.results);
    const answeredCount = visibleItems.length - pendingCount;
    const dueNextWeek = days
        .slice(NEXT_WEEK_DAY_RANGE.start, NEXT_WEEK_DAY_RANGE.end)
        .reduce((total, day) => total + day.count, 0);
    const todayDate = days.find((day) => day.isToday)?.date;

    useReviewHotkeys({
        isEnabled: view === 'due',
        answer: session.selectedAnswer,
        onAnswer: session.answerQuestion,
        onMark: session.markReview,
    });

    return (
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-7">
            <PageHeader
                title={t('Revisões')}
                description={t(
                    view === 'due'
                        ? REVIEW_DUE_SUBTITLE
                        : REVIEW_CLOSED_SUBTITLE,
                )}
                actions={
                    view === 'due' &&
                    roadmaps.length > 1 && (
                        <ReviewRoadmapFilter
                            roadmaps={roadmaps}
                            activeFilter={roadmapFilter}
                            totalCount={items.length}
                            onPick={setRoadmapFilter}
                        />
                    )
                }
            />
            {view === 'due' && (
                <>
                    <ReviewStats
                        totalCount={visibleItems.length}
                        answeredCount={answeredCount}
                        pendingCount={pendingCount}
                        dueNextWeek={dueNextWeek}
                    />
                    <ReviewCalendar days={days} todayCount={pendingCount} />
                    <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
                        <ReviewQueue
                            items={visibleItems}
                            results={session.results}
                            selectedId={session.selectedItem?.id}
                            onSelect={session.selectItem}
                        />
                        {session.selectedItem && (
                            <ReviewPanel
                                item={session.selectedItem}
                                answer={session.selectedAnswer}
                                onAnswer={session.answerQuestion}
                                onMark={session.markReview}
                            />
                        )}
                    </div>
                </>
            )}
            {view === 'finished' && (
                <ReviewSummary
                    answeredCount={answeredCount}
                    okCount={countOutcome(visibleItems, session.results, 'ok')}
                    againCount={countOutcome(
                        visibleItems,
                        session.results,
                        'again',
                    )}
                    todayDate={todayDate}
                    onUndo={session.undoLastMark}
                />
            )}
            {view === 'empty' && <ReviewEmpty nextReview={upcoming[0]} />}
            <ReviewUpcoming reviews={upcoming} />
        </div>
    );
}
