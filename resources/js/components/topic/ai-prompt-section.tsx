import { CheckIcon, CopyIcon } from '@/components/topic/topic-icons';
import { useCopyToClipboard } from '@/components/topic/use-copy-to-clipboard';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';

export function AiPromptSection({
    prompt,
    reviewChecks,
}: {
    prompt: string;
    reviewChecks: string[];
}) {
    const { t } = useTranslation();
    const { copied, copy } = useCopyToClipboard();

    return (
        <Card
            title={t('o que pedir para a IA')}
            aside={
                <Button
                    variant="ghost"
                    className="h-9 px-3"
                    onClick={() => void copy(prompt)}
                >
                    {copied ? <CheckIcon /> : <CopyIcon />}
                    {copied ? t('copiado') : t('copiar')}
                </Button>
            }
        >
            <p className="m-0 rounded-md bg-elevated p-4 text-sm leading-6 font-medium text-text">
                {prompt}
            </p>
            <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-muted">
                    {t('ao revisar a resposta, confira:')}
                </span>
                <ul className="m-0 flex list-none flex-col gap-2 p-0">
                    {reviewChecks.map((check) => (
                        <li
                            key={check}
                            className="flex items-start gap-3 text-sm text-secondary"
                        >
                            <span
                                aria-hidden="true"
                                className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                            />
                            {check}
                        </li>
                    ))}
                </ul>
            </div>
        </Card>
    );
}
