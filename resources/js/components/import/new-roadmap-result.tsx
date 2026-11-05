import { ImportResult } from '@/components/import/import-result';
import { RoadmapPreview } from '@/components/import/roadmap-preview';
import { ValidationChecks } from '@/components/import/validation-checks';
import { useMessageText } from '@/components/import/use-message-text';
import { ButtonLink } from '@/components/ui/button';
import type { NewRoadmapImport } from '@/lib/sample/import';

export function NewRoadmapResult({
    validation,
    onCancel,
}: {
    validation: NewRoadmapImport;
    onCancel: () => void;
}) {
    const readMessage = useMessageText();

    return (
        <ImportResult
            validation={validation}
            aside="trilha/v1"
            onCancel={onCancel}
            actions={
                <ButtonLink href="/roadmap">
                    {readMessage(validation.confirmLabel)}
                </ButtonLink>
            }
        >
            <ValidationChecks checks={validation.checks} />
            <RoadmapPreview sections={validation.preview} />
        </ImportResult>
    );
}
