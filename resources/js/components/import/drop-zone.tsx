import { useState } from 'react';
import type { DragEvent, RefObject } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

export function DropZone({
    inputRef,
    onFileSelect,
}: {
    inputRef: RefObject<HTMLInputElement | null>;
    onFileSelect: () => void;
}) {
    const { t } = useTranslation();
    const [isDragging, setIsDragging] = useState(false);

    function handleDragOver(event: DragEvent<HTMLDivElement>) {
        event.preventDefault();
        setIsDragging(true);
    }

    function handleDrop(event: DragEvent<HTMLDivElement>) {
        event.preventDefault();
        setIsDragging(false);
        onFileSelect();
    }

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={cn(
                'flex flex-wrap items-center justify-center gap-x-3.5 gap-y-2 rounded-sm border border-dashed bg-surface px-5 py-5 font-mono text-sm text-secondary transition-colors',
                isDragging ? 'border-accent bg-active' : 'border-leader',
            )}
        >
            <p>
                {t('arraste o arquivo')}{' '}
                <span className="font-bold text-accent">.json</span>{' '}
                {t('para cá')}
            </p>
            <span className="text-xs text-muted">{t('ou')}</span>
            <input
                ref={inputRef}
                type="file"
                accept=".json,application/json"
                className="hidden"
                onChange={(event) => {
                    if (event.currentTarget.files?.length) {
                        onFileSelect();
                    }
                }}
            />
            <Button
                variant="secondary"
                onClick={() => inputRef.current?.click()}
            >
                {t('Escolher arquivo')}
            </Button>
        </div>
    );
}
