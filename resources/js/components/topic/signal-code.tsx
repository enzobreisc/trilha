import { cn } from '@/lib/utils';

export function SignalCode({
    label,
    code,
    isGood,
}: {
    label: string;
    code: string;
    isGood: boolean;
}) {
    return (
        <div className="flex min-w-0 flex-col border border-strong">
            <div
                className={cn(
                    'flex items-center px-3 py-1 font-mono text-xs',
                    isGood ? 'bg-accent/15' : 'bg-elevated',
                )}
            >
                <span className={isGood ? 'text-accent' : 'text-danger'}>
                    {label}
                </span>
            </div>
            <pre className="m-0 overflow-x-auto bg-surface p-3 font-mono text-[13px] leading-6 text-secondary">
                {code}
            </pre>
        </div>
    );
}
