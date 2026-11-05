import { Head } from '@inertiajs/react';

export function HomeHeading({
    title,
    description,
}: {
    title: string;
    description: string;
}) {
    return (
        <header className="flex flex-col gap-1.5">
            <Head title={title} />
            <p className="font-mono text-xs text-muted">{description}</p>
            <h1 className="text-[28px] leading-9 font-semibold tracking-tight text-text">
                {title}
            </h1>
        </header>
    );
}
