import { useTranslation } from '@/hooks/use-translation';
import type { RoadmapOption } from '@/types/roadmap';

export function AppStatusBar({ roadmap }: { roadmap: RoadmapOption }) {
    const { t } = useTranslation();

    return (
        <footer className="flex min-h-7 flex-wrap items-center gap-x-5 gap-y-1 bg-footer px-4 py-1 font-mono text-[11px] text-text">
            <span className="font-bold">⎇ {roadmap.name}</span>
            <span>
                {t(':done/:total concluídos', {
                    done: roadmap.doneTopics,
                    total: roadmap.totalTopics,
                })}
            </span>
        </footer>
    );
}
