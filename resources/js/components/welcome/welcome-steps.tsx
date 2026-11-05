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
        <section className="flex flex-col gap-4">
            <SectionTitle>{t('como começar')}</SectionTitle>
            <ol className="grid gap-4 md:grid-cols-3">
                {WELCOME_STEPS.map((step) => (
                    <li
                        key={step.number}
                        className="flex flex-col gap-4 rounded-md bg-surface p-6 inset-ring inset-ring-border"
                    >
                        <span className="flex size-9 items-center justify-center rounded-full bg-active font-mono text-sm font-semibold text-accent">
                            {step.number}
                        </span>
                        <div className="flex flex-col gap-1">
                            <h3 className="font-display text-lg font-semibold">
                                {t(step.title)}
                            </h3>
                            <p className="text-sm font-medium text-muted">
                                {t(step.description)}
                            </p>
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    );
}
