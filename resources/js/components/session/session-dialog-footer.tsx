import { formatSessionDuration } from '@/components/session/session-draft';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';

export function SessionDialogFooter({
    weekMinutes,
    sessionMinutes,
    errorMessage,
    isSubmitting,
    onCancel,
}: {
    weekMinutes: number;
    sessionMinutes: number;
    errorMessage: string | undefined;
    isSubmitting: boolean;
    onCancel: () => void;
}) {
    const { t } = useTranslation();

    return (
        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-6 py-3.5">
            <span
                role={errorMessage ? 'alert' : undefined}
                className={
                    errorMessage
                        ? 'font-mono text-[11px] text-danger'
                        : 'font-mono text-[11px] text-faint'
                }
            >
                {errorMessage ??
                    t(':logged esta semana → :total', {
                        logged: formatSessionDuration(weekMinutes),
                        total: formatSessionDuration(
                            weekMinutes + sessionMinutes,
                        ),
                    })}
            </span>
            <div className="flex gap-2.5">
                <Button variant="secondary" onClick={onCancel}>
                    {t('Cancelar')}
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                    {t('Salvar sessão')}
                </Button>
            </div>
        </footer>
    );
}
