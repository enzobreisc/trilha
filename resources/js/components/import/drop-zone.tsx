import { useState } from 'react';
import type { DragEvent, RefObject } from 'react';
import { UploadIcon } from '@/components/import/import-icons';
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
                'flex flex-col items-center gap-4 rounded-md border border-dashed bg-surface px-6 py-10 text-center text-sm font-medium text-muted transition-colors',
                isDragging ? 'border-accent bg-active/40' : 'border-strong',
            )}
        >
            <span className="flex size-12 items-center justify-center rounded-full bg-active text-accent">
                <UploadIcon width={22} height={22} />
            </span>
            <p>
                {t('arraste o arquivo')}{' '}
                <span className="font-semibold text-text">.json</span>{' '}
                {t('para cá')}
            </p>
            <span className="text-xs text-faint">{t('ou')}</span>
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
            <Button onClick={() => inputRef.current?.click()}>
                {t('Escolher arquivo')}
            </Button>
        </div>
    );
}
