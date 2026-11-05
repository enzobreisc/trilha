import { useState } from 'react';
import type { ImportSummary } from '@/components/roadmap/types';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';

export function RoadmapImportNotice({ summary }: { summary: ImportSummary }) {
    const { t, plural } = useTranslation();
    const [isDismissed, setIsDismissed] = useState(false);

    if (isDismissed) {
        return null;
    }

    return (
        <div
            role="status"
            className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-md bg-warn-fill px-5 py-3 text-sm inset-ring inset-ring-warn-line"
        >
            <span className="font-bold text-text">
                {t(':fileName importado', { fileName: summary.fileName })}
            </span>
            <span className="font-medium text-secondary">
                {plural(summary.addedCount, 'novo', 'novos')} ·{' '}
                {plural(summary.changedCount, 'alterado', 'alterados')} ·{' '}
                {plural(summary.archivedCount, 'arquivado', 'arquivados')}
            </span>
            <Button
                variant="ghost"
                className="ml-auto h-9 px-4"
                onClick={() => setIsDismissed(true)}
            >
                {t('dispensar')}
            </Button>
        </div>
    );
}
