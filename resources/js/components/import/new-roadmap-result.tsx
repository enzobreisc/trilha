import { router } from '@inertiajs/react';
import { ImportResult } from '@/components/import/import-result';
import { RoadmapPreview } from '@/components/import/roadmap-preview';
import type { NewRoadmapImport } from '@/components/import/types';
import { ValidationChecks } from '@/components/import/validation-checks';
import { Button } from '@/components/ui/button';

export function NewRoadmapResult({
    validation,
    onCancel,
}: {
    validation: NewRoadmapImport;
    onCancel: () => void;
}) {
    return (
        <ImportResult
            validation={validation}
            aside="trilha/v1"
            onCancel={onCancel}
            actions={
                <Button onClick={() => router.post('/import')}>
                    {validation.confirmLabel}
                </Button>
            }
        >
            <ValidationChecks checks={validation.checks} />
            <RoadmapPreview sections={validation.preview} />
        </ImportResult>
    );
}
