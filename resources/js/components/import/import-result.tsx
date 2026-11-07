import type { ReactNode } from 'react';
import type { ImportValidation } from '@/components/import/types';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';

export function ImportResult({
    validation,
    aside,
    actions,
    footnote,
    className,
    onCancel,
    children,
}: {
    validation: ImportValidation;
    aside: string;
    actions: ReactNode;
    footnote?: ReactNode;
    className?: string;
    onCancel: () => void;
    children: ReactNode;
}) {
    const { t } = useTranslation();

    return (
        <Card title={t('conferência')} className={className}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-mono text-sm font-bold text-text">
                        {validation.fileName}
                    </span>
                    <span className="font-mono text-xs text-muted">
                        {validation.fileMeta}
                    </span>
                </div>
                <span className="font-mono text-xs text-accent">{aside}</span>
            </div>
            {children}
            <div className="flex flex-wrap gap-2.5">
                {actions}
                <Button variant="secondary" onClick={onCancel}>
                    {t('Cancelar')}
                </Button>
            </div>
            {footnote && <p className="text-xs text-faint">{footnote}</p>}
        </Card>
    );
}
