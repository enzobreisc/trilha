import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import { ROADMAP_FORMAT_INSTRUCTIONS } from '@/lib/sample/import';

export function AiGenerationSection() {
    const { t } = useTranslation();
    const [isCopied, setIsCopied] = useState(false);

    async function copyFormatInstructions() {
        try {
            await navigator.clipboard.writeText(ROADMAP_FORMAT_INSTRUCTIONS);
            setIsCopied(true);
        } catch {
            setIsCopied(false);
        }
    }

    return (
        <Card title={t('gerar com uma IA')}>
            <p className="text-sm font-medium text-secondary">
                {t(
                    'Copie as instruções do formato e cole junto com o roadmap que você quer. A IA devolve o .json pronto para importar.',
                )}
            </p>
            <div className="flex flex-wrap gap-2.5">
                <Button onClick={copyFormatInstructions}>
                    {t(isCopied ? 'Instruções copiadas' : 'Copiar instruções')}
                </Button>
                <Button variant="secondary">
                    {t('Baixar arquivo modelo')}
                </Button>
            </div>
        </Card>
    );
}
