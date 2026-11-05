import type { ComponentType, SVGProps } from 'react';
import { ReviewIcon } from '@/components/ui/icons';
import { useTranslation } from '@/hooks/use-translation';
import type { TranslationKey } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { CheckCircleIcon, PendingIcon } from './review-icons';
import type { ReviewOutcome } from './types';

const STATUS_ICONS: Record<
    ReviewOutcome | 'pending',
    {
        label: TranslationKey;
        icon: ComponentType<SVGProps<SVGSVGElement>>;
        className: string;
    }
> = {
    pending: { label: 'pendente', icon: PendingIcon, className: 'text-warn' },
    ok: {
        label: 'lembrei bem',
        icon: CheckCircleIcon,
        className: 'text-accent',
    },
    again: { label: 'preciso rever', icon: ReviewIcon, className: 'text-warn' },
};

export function ReviewStatusIcon({ outcome }: { outcome?: ReviewOutcome }) {
    const { t } = useTranslation();
    const { label, icon: Icon, className } = STATUS_ICONS[outcome ?? 'pending'];

    return (
        <span
            role="img"
            aria-label={t(label)}
            className={cn('flex shrink-0', className)}
        >
            <Icon />
        </span>
    );
}
