import type { ReactNode } from 'react';

export function TopicColumns({
    main,
    aside,
}: {
    main: ReactNode;
    aside: ReactNode;
}) {
    return (
        <div className="grid items-start gap-7 lg:grid-cols-3">
            <div className="flex min-w-0 flex-col gap-7 lg:col-span-2">
                {main}
            </div>
            <aside className="flex min-w-0 flex-col gap-7">{aside}</aside>
        </div>
    );
}
