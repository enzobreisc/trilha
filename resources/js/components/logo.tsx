import { cn } from '@/lib/utils';

export function LogoMark({
    size = 22,
    className,
}: {
    size?: number;
    className?: string;
}) {
    return (
        <svg
            role="img"
            aria-label="Logo da trilha"
            width={size}
            height={size}
            viewBox="0 0 64 64"
            className={className}
        >
            <path
                d="M20 58V8"
                className="stroke-strong"
                strokeWidth="5"
                strokeLinecap="round"
            />
            <path
                d="M20 42C20 30 44 34 44 22V12"
                fill="none"
                className="stroke-primary"
                strokeWidth="5"
                strokeLinecap="round"
            />
            <circle cx="20" cy="50" r="7" className="fill-primary" />
            <circle cx="20" cy="30" r="5" className="fill-strong" />
            <circle cx="44" cy="12" r="8" className="fill-accent" />
        </svg>
    );
}

export function Logo({ className }: { className?: string }) {
    return (
        <span className={cn('flex items-center gap-2.5', className)}>
            <LogoMark />
            <span className="font-display text-[17px] font-bold">trilha</span>
        </span>
    );
}
