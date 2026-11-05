import { useTranslation } from '@/hooks/use-translation';
import type { RoadmapMatch } from '@/lib/sample/import';

export function RoadmapMatchBanner({ match }: { match: RoadmapMatch }) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-sm bg-active px-4 py-3 text-sm">
            <span className="font-medium text-muted">
                {t('reconhecido pela chave')}{' '}
                <span className="font-mono text-text">{match.fileKey}</span>
            </span>
            <span aria-hidden="true" className="text-faint">
                →
            </span>
            <span className="font-semibold text-accent">
                {match.roadmapName}
            </span>
        </div>
    );
}
