import { SignalCode } from '@/components/topic/signal-code';
import { TopicSection } from '@/components/topic/topic-section';
import { useTranslation } from '@/hooks/use-translation';
import type { TopicSignal } from '@/lib/sample/topic';

export function SignalSection({
    bad,
    good,
}: {
    bad: TopicSignal;
    good: TopicSignal;
}) {
    const { t } = useTranslation();

    return (
        <TopicSection title={t('sinais no código')}>
            <div className="grid gap-4 md:grid-cols-2">
                <SignalCode label={t('problema')} signal={bad} isGood={false} />
                <SignalCode label={t('bom')} signal={good} isGood />
            </div>
        </TopicSection>
    );
}
