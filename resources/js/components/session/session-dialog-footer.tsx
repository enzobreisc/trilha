import { formatSessionDuration } from '@/components/session/session-draft';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';

export function SessionDialogFooter({
    weekMinutes,
    sessionMinutes,
    onCancel,
}: {
    weekMinutes: number;
    sessionMinutes: number;
    onCancel: () => void;
}) {
    const { t } = useTranslation();

    return (
        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-6 py-3.5">
            <span className="font-mono text-[11px] text-faint">
                {t(':logged esta semana → :total', {
                    logged: formatSessionDuration(weekMinutes),
                    total: formatSessionDuration(weekMinutes + sessionMinutes),
                })}
            </span>
            <div className="flex gap-2.5">
                <Button variant="secondary" onClick={onCancel}>
                    {t('Cancelar')}
                </Button>
                <Button type="submit">{t('Salvar sessão')}</Button>
            </div>
        </footer>
    );
}
