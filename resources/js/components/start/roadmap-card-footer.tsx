import type { RoadmapState } from '@/components/start/roadmap-progress';
import { RoadmapReviewStatus } from '@/components/start/roadmap-review-status';
import { ButtonLink } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import type { TranslationKey } from '@/lib/i18n';
import type { RoadmapSummary } from '@/types/roadmap';

const ACTION_LABELS: Record<RoadmapState, TranslationKey> = {
    completed: 'Revisar tudo',
    notStarted: 'Começar',
    inProgress: 'Continuar',
};

export function RoadmapCardFooter({
    roadmap,
    state,
    isLastStudied,
}: {
    roadmap: RoadmapSummary;
    state: RoadmapState;
    isLastStudied: boolean;
}) {
    const { t } = useTranslation();

    return (
        <footer className="flex shrink-0 flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs">
            <RoadmapReviewStatus
                reviewsDue={roadmap.reviewsDue}
                lastStudiedDaysAgo={roadmap.lastStudiedDaysAgo}
            />
            <ButtonLink
                href={`/roadmaps/${roadmap.id}/select`}
                method="put"
                variant={isLastStudied ? 'primary' : 'secondary'}
            >
                {t(ACTION_LABELS[state])}
            </ButtonLink>
        </footer>
    );
}
