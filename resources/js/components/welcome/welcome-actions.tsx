import { Button, ButtonLink } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';

export function WelcomeActions() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href="/import" variant="primary">
                {t('Importar .json')}
            </ButtonLink>
            <ButtonLink href="/import" variant="secondary">
                {t('Ver o formato do arquivo')}
            </ButtonLink>
            <Button variant="secondary">{t('Baixar arquivo modelo')}</Button>
        </div>
    );
}
