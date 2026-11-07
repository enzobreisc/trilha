import { ButtonLink, DownloadLink } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';

export function WelcomeActions() {
    const { t } = useTranslation();

    return (
        <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href="/import" variant="primary">
                {t('Importar .json')}
            </ButtonLink>
            <ButtonLink href="/import#format" variant="secondary">
                {t('Ver o formato do arquivo')}
            </ButtonLink>
            <DownloadLink href="/import/template">
                {t('Baixar arquivo modelo')}
            </DownloadLink>
        </div>
    );
}
