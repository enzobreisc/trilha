import type { SessionEntry } from '@/components/sessions/types';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';

export function SessionEntryDetails({ session }: { session: SessionEntry }) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-3 px-3 pt-1 pb-3">
            {session.note && (
                <p className="text-sm leading-6 text-secondary">
                    {session.note}
                </p>
            )}
            <div className="flex gap-2">
                <Button variant="secondary" className="h-9 px-4 text-xs">
                    {t('editar')}
                </Button>
                <Button variant="ghost" className="h-9 px-4 text-xs">
                    {t('excluir')}
                </Button>
            </div>
        </div>
    );
}
