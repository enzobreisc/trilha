import { router } from '@inertiajs/react';
import { ImportResult } from '@/components/import/import-result';
import { RoadmapDiffView } from '@/components/import/roadmap-diff';
import { RoadmapMatchBanner } from '@/components/import/roadmap-match-banner';
import type { UpdatedRoadmapImport } from '@/components/import/types';
import { ValidationChecks } from '@/components/import/validation-checks';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';

export function UpdatedRoadmapResult({
    validation,
    onCancel,
}: {
    validation: UpdatedRoadmapImport;
    onCancel: () => void;
}) {
    const { plural } = useTranslation();
    const changeCount = validation.diff.entries.length;

    return (
        <ImportResult
            validation={validation}
            aside={plural(changeCount, 'mudança', 'mudanças')}
            onCancel={onCancel}
            actions={
                <Button onClick={() => router.post('/import')}>
                    {validation.confirmLabel}
                </Button>
            }
        >
            <RoadmapMatchBanner match={validation.match} />
            <ValidationChecks checks={validation.checks} />
            <RoadmapDiffView diff={validation.diff} />
        </ImportResult>
    );
}
