import { SignalCode } from '@/components/topic/signal-code';
import { TopicSection } from '@/components/topic/topic-section';
import type { TopicSignals } from '@/components/topic/types';
import { useTranslation } from '@/hooks/use-translation';

export function SignalSection({ signals }: { signals: TopicSignals }) {
    const { t } = useTranslation();

    return (
        <TopicSection title={t('sinais no código')}>
            <div className="grid gap-4 md:grid-cols-2">
                {signals.bad && (
                    <SignalCode
                        label={t('problema')}
                        code={signals.bad}
                        isGood={false}
                    />
                )}
                {signals.good && (
                    <SignalCode label={t('bom')} code={signals.good} isGood />
                )}
            </div>
        </TopicSection>
    );
}
