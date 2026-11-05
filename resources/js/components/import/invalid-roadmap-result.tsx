import { ImportResult } from '@/components/import/import-result';
import { ValidationChecks } from '@/components/import/validation-checks';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import type {
    CheckStatus,
    ImportMode,
    InvalidRoadmapImport,
    ValidationCheck,
} from '@/lib/sample/import';

export function InvalidRoadmapResult({
    validation,
    onCancel,
    onChooseFile,
    onSelectMode,
}: {
    validation: InvalidRoadmapImport;
    onCancel: () => void;
    onChooseFile: () => void;
    onSelectMode: (mode: ImportMode) => void;
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
                <>
                    {validation.updateTargetName && (
                        <Button onClick={() => onSelectMode('update')}>
                            {t('Atualizar :name', {
                                name: validation.updateTargetName,
                            })}
                        </Button>
                    )}
                    <Button
                        variant={
                            validation.updateTargetName
                                ? 'secondary'
                                : 'primary'
                        }
                        onClick={onChooseFile}
                    >
                        {t('Escolher outro arquivo')}
                    </Button>
                </>
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
