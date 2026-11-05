import { WelcomeActions } from '@/components/welcome/welcome-actions';
import { WelcomeSteps } from '@/components/welcome/welcome-steps';
import { useTranslation } from '@/hooks/use-translation';

export function WelcomeEmptyState() {
    const { t } = useTranslation();

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-9 pt-6">
            <section className="flex flex-col gap-3">
                <h1 className="font-mono text-2xl font-bold">
                    <span aria-hidden="true" className="text-accent">
                        ${' '}
                    </span>
                    {t('Nenhum roadmap ainda')}
                    <span
                        aria-hidden="true"
                        className="ml-1.5 inline-block h-5 w-2.5 translate-y-[3px] bg-accent"
                    />
                </h1>
                <p className="max-w-[64ch] text-secondary">
                    {t(
                        'A trilha começa com um arquivo .json com seções, grupos e tópicos. Você monta, ou pede para uma IA montar, e importa aqui.',
                    )}
                </p>
            </section>
            <WelcomeSteps />
            <div className="flex flex-col gap-4">
                <WelcomeActions />
                <p className="font-mono text-xs text-muted">
                    {t(
                        'seu gráfico de contribuições começa no primeiro dia de estudo',
                    )}
                </p>
            </div>
        </div>
    );
}
