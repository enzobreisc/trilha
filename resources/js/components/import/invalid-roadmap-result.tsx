import { ImportResult } from '@/components/import/import-result';
import type {
    CheckStatus,
    InvalidRoadmapImport,
    ValidationCheck,
} from '@/components/import/types';
import { ValidationChecks } from '@/components/import/validation-checks';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';

export function InvalidRoadmapResult({
    validation,
    onCancel,
    onChooseFile,
}: {
    validation: InvalidRoadmapImport;
    onCancel: () => void;
    onChooseFile: () => void;
}) {
    const { t, plural } = useTranslation();
    const errorCount = countChecksWithStatus(validation.checks, 'error');
    const warningCount = countChecksWithStatus(validation.checks, 'warn');

    return (
        <ImportResult
            validation={validation}
            aside={`${plural(errorCount, 'erro', 'erros')} · ${plural(warningCount, 'aviso', 'avisos')}`}
            className="inset-ring-danger-line"
            onCancel={onCancel}
            actions={
                <Button onClick={onChooseFile}>
                    {t('Escolher outro arquivo')}
                </Button>
            }
            footnote={t('Nada foi salvo. Corrija o arquivo e escolha de novo.')}
        >
            <ValidationChecks checks={validation.checks} />
        </ImportResult>
    );
}

function countChecksWithStatus(
    checks: ValidationCheck[],
    status: CheckStatus,
): number {
    return checks.filter((check) => check.status === status).length;
}
