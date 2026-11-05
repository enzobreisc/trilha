import { SectionTitle } from '@/components/ui/page-header';
import { useTranslation } from '@/hooks/use-translation';
import type { TranslationKey } from '@/lib/i18n';

type WelcomeStep = {
    number: string;
    title: TranslationKey;
    description: TranslationKey;
};

const WELCOME_STEPS: WelcomeStep[] = [
    {
        number: '01',
        title: 'Gere o arquivo',
        description: 'No formato trilha/v1, à mão ou com uma IA.',
    },
    {
        number: '02',
        title: 'Importe',
        description: 'O app confere tudo antes de salvar.',
    },
    {
        number: '03',
        title: 'Comece a trilha',
        description: 'Escolha o primeiro tópico e registre a sessão.',
    },
];

export function WelcomeSteps() {
    const { t } = useTranslation();

    return (
        <section className="flex flex-col gap-2">
            <SectionTitle>{t('como começar')}</SectionTitle>
            <ol className="flex flex-col">
                {WELCOME_STEPS.map((step) => (
                    <li
                        key={step.number}
                        className="flex items-start gap-4 border-t border-border py-3"
                    >
                        <span className="font-mono text-sm font-semibold text-accent">
                            {step.number}
                        </span>
                        <div className="flex flex-col gap-0.5">
                            <h3 className="font-semibold text-text">
                                {t(step.title)}
                            </h3>
                            <p className="text-secondary">
                                {t(step.description)}
                            </p>
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    );
}
