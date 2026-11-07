import type { CheckStatus, ValidationCheck } from '@/components/import/types';
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
    return (
        <ul className="flex flex-col gap-1.5">
            {checks.map((check) => (
                <li key={check.message} className="flex items-start gap-2.5">
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
                        <span className="text-text">{check.message}</span>
                        {check.details?.map((detail) => (
                            <span
                                key={`${detail.location}-${detail.note ?? ''}`}
                                className="font-mono text-xs text-muted"
                            >
                                {detail.location}
                                {detail.note && `: ${detail.note}`}
                            </span>
                        ))}
                        {check.hint && (
                            <span className="text-xs text-muted">
                                {check.hint}
                            </span>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
}
