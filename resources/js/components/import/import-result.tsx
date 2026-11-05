import type { ReactNode } from 'react';
import { useMessageText } from '@/components/import/use-message-text';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import type { ImportValidation } from '@/lib/sample/import';

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
    const readMessage = useMessageText();

    return (
        <Card title={t('conferência')} aside={aside} className={className}>
            <div className="flex flex-wrap justify-between gap-x-4 gap-y-1 text-xs text-faint">
                <span className="font-semibold text-text">
                    {validation.fileName}
                </span>
                <span>{readMessage(validation.fileMeta)}</span>
            </div>
            {children}
            <div className="flex flex-wrap gap-2.5">
                {actions}
                <Button variant="ghost" onClick={onCancel}>
                    {t('Cancelar')}
                </Button>
            </div>
            {footnote && <p className="text-xs text-faint">{footnote}</p>}
        </Card>
    );
}
