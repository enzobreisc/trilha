import type { RoadmapData } from '@/components/roadmap/types';
import { ButtonLink } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';

export function RoadmapSource({ data }: { data: RoadmapData }) {
    const { t, shortDate } = useTranslation();

    return (
        <footer className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border pt-4 font-mono text-xs text-muted">
            <span>
                {data.sourceLabel} · {data.sourceFile} ·{' '}
                {t('importado em :date', { date: shortDate(data.importedOn) })}
            </span>
            <ButtonLink href="/import" variant="ghost" className="h-7 px-2">
                {t('Reimportar')}
            </ButtonLink>
        </footer>
    );
}
