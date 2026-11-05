import { useTranslation } from '@/hooks/use-translation';
import type { TopicSignal } from '@/lib/sample/topic';
import { cn } from '@/lib/utils';

export function SignalCode({
    label,
    signal,
    isGood,
}: {
    label: string;
    signal: TopicSignal;
    isGood: boolean;
}) {
    const { t } = useTranslation();

    return (
        <div className="flex min-w-0 flex-col border border-strong">
            <div
                className={cn(
                    'flex items-center justify-between px-3 py-1 font-mono text-xs',
                    isGood ? 'bg-accent/15' : 'bg-elevated',
                )}
            >
                <span className={isGood ? 'text-accent' : 'text-danger'}>
                    {label}
                </span>
                <span className="text-secondary">
                    {t(':count queries', { count: signal.queries })}
                </span>
            </div>
            <pre className="m-0 overflow-x-auto bg-surface p-3 font-mono text-[13px] leading-6 text-secondary">
                {signal.code}
            </pre>
        </div>
    );
}
