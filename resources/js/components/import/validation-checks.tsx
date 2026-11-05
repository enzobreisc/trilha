import type { ComponentType, SVGProps } from 'react';
import {
    CheckCircleIcon,
    ErrorIcon,
    WarningIcon,
} from '@/components/import/import-icons';
import { useMessageText } from '@/components/import/use-message-text';
import type { CheckStatus, ValidationCheck } from '@/lib/sample/import';
import { cn } from '@/lib/utils';

const CHECK_ICONS: Record<
    CheckStatus,
    ComponentType<SVGProps<SVGSVGElement>>
> = {
    ok: CheckCircleIcon,
    warn: WarningIcon,
    error: ErrorIcon,
};

const CHECK_TONES: Record<CheckStatus, string> = {
    ok: 'text-accent',
    warn: 'text-warn',
    error: 'text-danger',
};

export function ValidationChecks({ checks }: { checks: ValidationCheck[] }) {
    const readMessage = useMessageText();

    return (
        <ul className="flex flex-col">
            {checks.map((check) => {
                const StatusIcon = CHECK_ICONS[check.status];

                return (
                    <li
                        key={check.message.key}
                        className="flex items-start gap-3 border-b border-border py-3 last:border-b-0"
                    >
                        <StatusIcon
                            className={cn(
                                'mt-0.5 shrink-0',
                                CHECK_TONES[check.status],
                            )}
                        />
                        <div className="flex min-w-0 flex-col gap-0.5">
                            <span className="text-sm font-medium text-text">
                                {readMessage(check.message)}
                            </span>
                            {check.details?.map((detail) => (
                                <span
                                    key={detail.location}
                                    className="font-mono text-xs text-faint"
                                >
                                    {detail.location}
                                    {detail.note &&
                                        `: ${readMessage(detail.note)}`}
                                </span>
                            ))}
                            {check.hint && (
                                <span className="text-xs text-faint">
                                    {readMessage(check.hint)}
                                </span>
                            )}
                        </div>
                    </li>
                );
            })}
        </ul>
    );
}
