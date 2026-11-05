type TopicStatusIconState = 'todo' | 'studying';

export function TopicStatusIcon({
    status,
    className,
}: {
    status: TopicStatusIconState;
    className?: string;
}) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.9}
            aria-hidden="true"
            className={className}
        >
            <circle cx="12" cy="12" r="8.5" />
            {status === 'studying' && (
                <path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor" />
            )}
        </svg>
    );
}
