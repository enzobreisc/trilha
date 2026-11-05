import { useTranslation } from '@/hooks/use-translation';
import type { TranslationKey } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import type { ReviewOutcome } from './types';

const STATUS_GLYPHS: Record<
    ReviewOutcome | 'pending',
    { label: TranslationKey; glyph: string; className: string }
> = {
    pending: { label: 'pendente', glyph: '◆', className: 'text-review' },
    ok: { label: 'lembrei bem', glyph: '■', className: 'text-success' },
    again: { label: 'preciso rever', glyph: '◆', className: 'text-warn' },
};

export function ReviewStatusIcon({ outcome }: { outcome?: ReviewOutcome }) {
    const { t } = useTranslation();
    const { label, glyph, className } = STATUS_GLYPHS[outcome ?? 'pending'];

    return (
        <span
            role="img"
            aria-label={t(label)}
            className={cn(
                'flex w-3 shrink-0 justify-center font-mono text-xs',
                className,
            )}
        >
            {glyph}
        </span>
    );
}
