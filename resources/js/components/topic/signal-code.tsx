import { useTranslation } from '@/hooks/use-translation';
import type { TopicSignal } from '@/lib/sample/topic';

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
        <div className="flex min-w-0 flex-col gap-2">
            <div className="flex items-center justify-between text-sm font-semibold">
                <span className={isGood ? 'text-accent' : 'text-danger'}>
                    {label}
                </span>
                <span className="font-mono text-xs text-secondary">
                    {t(':count queries', { count: signal.queries })}
                </span>
            </div>
            <pre className="m-0 overflow-x-auto rounded-md bg-elevated p-4 font-mono text-sm leading-6 text-secondary">
                {signal.code}
            </pre>
        </div>
    );
}
