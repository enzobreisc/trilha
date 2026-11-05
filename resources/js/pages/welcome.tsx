import { ContributionPreview } from '@/components/welcome/contribution-preview';
import { EmptyMark } from '@/components/welcome/empty-mark';
import { WelcomeActions } from '@/components/welcome/welcome-actions';
import { WelcomeSteps } from '@/components/welcome/welcome-steps';
import { useTranslation } from '@/hooks/use-translation';

export default function Welcome() {
    const { t } = useTranslation();

    return (
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-10">
            <section className="flex flex-col items-center gap-6 pt-6 text-center">
                <EmptyMark />
                <div className="flex flex-col items-center gap-3">
                    <h1 className="font-display text-[40px] leading-none font-bold tracking-tighter">
                        {t('Nenhum roadmap ainda')}
                    </h1>
                    <p className="max-w-lg text-[15px] font-medium text-muted">
                        {t(
                            'A trilha começa com um arquivo .json com seções, grupos e tópicos. Você monta, ou pede para uma IA montar, e importa aqui.',
                        )}
                    </p>
                </div>
                <WelcomeActions />
            </section>
            <WelcomeSteps />
            <ContributionPreview />
        </div>
    );
}
