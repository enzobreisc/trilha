export function SessionStat({
    value,
    caption,
}: {
    value: string;
    caption: string;
}) {
    return (
        <div className="flex flex-col gap-2 rounded-md bg-surface p-6 inset-ring inset-ring-border">
            <span className="font-display text-3xl leading-none font-bold tracking-tight text-text">
                {value}
            </span>
            <span className="text-sm font-medium text-muted">{caption}</span>
        </div>
    );
}
