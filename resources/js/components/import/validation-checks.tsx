import { useMessageText } from '@/components/import/use-message-text';
import type { CheckStatus, ValidationCheck } from '@/lib/sample/import';
import { cn } from '@/lib/utils';

const CHECK_GLYPHS: Record<CheckStatus, string> = {
    ok: '✓',
    warn: '!',
    error: '✗',
};

const CHECK_TONES: Record<CheckStatus, string> = {
    ok: 'text-success',
    warn: 'text-link',
    error: 'text-danger',
};

export function ValidationChecks({ checks }: { checks: ValidationCheck[] }) {
    const readMessage = useMessageText();

    return (
        <ul className="flex flex-col gap-1.5">
            {checks.map((check) => (
                <li
                    key={check.message.key}
                    className="flex items-start gap-2.5"
                >
                    <span
                        aria-hidden="true"
                        className={cn(
                            'w-3.5 shrink-0 font-mono',
                            CHECK_TONES[check.status],
                        )}
                    >
                        {CHECK_GLYPHS[check.status]}
                    </span>
                    <div className="flex min-w-0 flex-col">
                        <span className="text-text">
                            {readMessage(check.message)}
                        </span>
                        {check.details?.map((detail) => (
                            <span
                                key={detail.location}
                                className="font-mono text-xs text-muted"
                            >
                                {detail.location}
                                {detail.note && `: ${readMessage(detail.note)}`}
                            </span>
                        ))}
                        {check.hint && (
                            <span className="text-xs text-muted">
                                {readMessage(check.hint)}
                            </span>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
}
