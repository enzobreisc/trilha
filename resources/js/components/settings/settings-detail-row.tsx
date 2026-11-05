import type { ReactNode } from 'react';

export function SettingsDetailRow({
    label,
    value,
}: {
    label: ReactNode;
    value: ReactNode;
}) {
    return (
        <div className="flex flex-wrap gap-x-5 gap-y-1 font-mono text-[13px]">
            <span className="w-37.5 shrink-0 text-muted">{label}</span>
            <span className="min-w-0 flex-1 [overflow-wrap:anywhere] text-text">
                {value}
            </span>
        </div>
    );
}
