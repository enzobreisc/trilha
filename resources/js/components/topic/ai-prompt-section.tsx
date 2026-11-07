import { CheckIcon, CopyIcon } from '@/components/topic/topic-icons';
import { TopicSection } from '@/components/topic/topic-section';
import { useCopyToClipboard } from '@/components/topic/use-copy-to-clipboard';
import { useKeyShortcut } from '@/hooks/use-key-shortcut';
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

    useKeyShortcut('c', () => void copy(prompt));

    return (
        <TopicSection
            title={t('o que pedir para a IA')}
            aside={
                <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent"
                    onClick={() => void copy(prompt)}
                >
                    {copied ? <CheckIcon /> : <CopyIcon />}
                    {copied ? t('copiado') : t('copiar')}
                </button>
            }
        >
            <p className="m-0 text-sm leading-7 text-text">{prompt}</p>
            {reviewChecks.length > 0 && (
                <div className="flex flex-col gap-2">
                    <span className="font-mono text-xs text-muted">
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
                                    className="font-mono text-accent"
                                >
                                    ›
                                </span>
                                {check}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </TopicSection>
    );
}
