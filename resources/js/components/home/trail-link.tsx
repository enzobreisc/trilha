import { Link } from '@inertiajs/react';
import type { HomeProgress } from '@/components/home/types';
import { SegmentedProgress } from '@/components/segmented-progress';
import { useTranslation } from '@/hooks/use-translation';

const ROADMAP_ROUTE = '/roadmap';
const PERCENT = 100;

export function TrailLink({ progress }: { progress: HomeProgress }) {
    const { t } = useTranslation();
    const percentDone =
        progress.total === 0
            ? 0
            : Math.round((progress.done / progress.total) * PERCENT);

    return (
        <Link
            href={ROADMAP_ROUTE}
            className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-sm border border-border px-5 py-3 hover:bg-active/60"
        >
            <span className="font-mono text-[11px] tracking-[0.08em] text-muted uppercase">
                {t('trilha')}
            </span>
            <SegmentedProgress
                className="min-w-24 flex-1"
                filled={progress.done}
                total={progress.total}
            />
            <span className="font-mono text-xs text-secondary">
                {t(':done/:total concluídos', progress)} · {percentDone}%
            </span>
            <span className="font-mono text-xs text-accent">
                {t('ver trilha →')}
            </span>
        </Link>
    );
}
