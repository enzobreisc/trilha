import { useTranslation } from '@/hooks/use-translation';
import type { RoadmapMatch } from '@/components/import/types';

export function RoadmapMatchBanner({ match }: { match: RoadmapMatch }) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs">
            <span className="text-muted">
                {t('reconhecido pela chave')}{' '}
                <span className="text-accent">{match.fileKey}</span>
            </span>
            <span aria-hidden="true" className="text-muted">
                →
            </span>
            <span className="font-bold text-text">{match.roadmapName}</span>
        </div>
    );
}
