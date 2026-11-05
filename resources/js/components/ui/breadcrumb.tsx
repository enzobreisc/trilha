import { Link } from '@inertiajs/react';
import { Fragment } from 'react';

export type BreadcrumbItem = { label: string; href?: string };

export function Breadcrumb({
    label,
    items,
}: {
    label: string;
    items: BreadcrumbItem[];
}) {
    return (
        <nav
            aria-label={label}
            className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-xs text-muted"
        >
            {items.map((item, index) => {
                const isCurrent = index === items.length - 1;
                return (
                    <Fragment key={`${item.label}-${index}`}>
                        {index > 0 && <span aria-hidden="true">/</span>}
                        {item.href && !isCurrent ? (
                            <Link
                                href={item.href}
                                className="app-no-drag hover:text-text"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span
                                aria-current={isCurrent ? 'page' : undefined}
                                className={isCurrent ? 'text-text' : undefined}
                            >
                                {item.label}
                            </span>
                        )}
                    </Fragment>
                );
            })}
        </nav>
    );
}
