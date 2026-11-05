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
}: {
    roadmap: RoadmapSummary;
    state: RoadmapState;
}) {
    const { t } = useTranslation();

    return (
        <footer className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm font-medium">
                <RoadmapReviewStatus
                    reviewsDue={roadmap.reviewsDue}
                    lastStudiedDaysAgo={roadmap.lastStudiedDaysAgo}
                />
            </div>
            <ButtonLink href={roadmap.currentTopic.href} variant="primary">
                {t(ACTION_LABELS[state])}
            </ButtonLink>
        </footer>
    );
}
