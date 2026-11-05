import { ImportResult } from '@/components/import/import-result';
import { RoadmapDiffView } from '@/components/import/roadmap-diff';
import { RoadmapMatchBanner } from '@/components/import/roadmap-match-banner';
import { useMessageText } from '@/components/import/use-message-text';
import { ValidationChecks } from '@/components/import/validation-checks';
import { ButtonLink } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import type { UpdatedRoadmapImport } from '@/lib/sample/import';

export function UpdatedRoadmapResult({
    validation,
    onCancel,
}: {
    validation: UpdatedRoadmapImport;
    onCancel: () => void;
}) {
    const { plural } = useTranslation();
    const readMessage = useMessageText();
    const changeCount = validation.diff.entries.length;

    return (
        <ImportResult
            validation={validation}
            aside={plural(changeCount, 'mudança', 'mudanças')}
            onCancel={onCancel}
            actions={
                <ButtonLink href="/roadmap">
                    {readMessage(validation.confirmLabel)}
                </ButtonLink>
            }
        >
            <RoadmapMatchBanner match={validation.match} />
            <ValidationChecks checks={validation.checks} />
            <RoadmapDiffView diff={validation.diff} />
        </ImportResult>
    );
}
