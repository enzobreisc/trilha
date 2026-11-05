import { AiGenerationSection } from '@/components/import/ai-generation-section';
import { FormatExample } from '@/components/import/format-example';
import { SectionLabel } from '@/components/ui/section-label';
import { useTranslation } from '@/hooks/use-translation';

export function FormatAside() {
    const { t } = useTranslation();

    return (
        <aside className="flex w-full max-w-110 min-w-0 flex-[1_1_340px] flex-col gap-7">
            <section className="flex flex-col gap-3">
                <SectionLabel aside="json">
                    {t('formato do arquivo')}
                </SectionLabel>
                <FormatExample />
                <p className="text-xs text-faint">
                    {t(
                        'Em verde, o obrigatório. O resto é opcional: o tópico só mostra as seções que o arquivo trouxer.',
                    )}
                </p>
            </section>
            <AiGenerationSection />
        </aside>
    );
}
