import { router, usePage } from '@inertiajs/react';
import { useRef } from 'react';
import { DropZone } from '@/components/import/drop-zone';
import { FormatAside } from '@/components/import/format-aside';
import { InvalidRoadmapResult } from '@/components/import/invalid-roadmap-result';
import { NewRoadmapResult } from '@/components/import/new-roadmap-result';
import type { ImportPreview } from '@/components/import/types';
import { UpdatedRoadmapResult } from '@/components/import/updated-roadmap-result';
import { BackLink } from '@/components/ui/back-link';
import { PageHeader } from '@/components/ui/page-header';
import { useTranslation } from '@/hooks/use-translation';

export default function Import({ preview }: { preview: ImportPreview | null }) {
    const { t } = useTranslation();
    const { errors } = usePage().props;
    const fileInputRef = useRef<HTMLInputElement>(null);

    function previewFile(file: File) {
        router.post(
            '/import/preview',
            { file },
            { forceFormData: true, preserveScroll: true },
        );
    }

    function cancelPreview() {
        router.delete('/import/preview', { preserveScroll: true });
    }

    return (
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-7">
            <BackLink />
            <PageHeader
                title={t('Adicionar ou atualizar roadmap')}
                description={t(
                    'O arquivo é conferido antes de qualquer mudança. Nada entra no banco até você confirmar.',
                )}
            />
            <div className="flex flex-wrap items-start gap-9">
                <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-7">
                    <DropZone
                        inputRef={fileInputRef}
                        errorMessage={errors.file}
                        onFileSelect={previewFile}
                    />
                    {preview?.kind === 'new' && (
                        <NewRoadmapResult
                            validation={preview.validation}
                            onCancel={cancelPreview}
                        />
                    )}
                    {preview?.kind === 'update' && (
                        <UpdatedRoadmapResult
                            validation={preview.validation}
                            onCancel={cancelPreview}
                        />
                    )}
                    {preview?.kind === 'invalid' && (
                        <InvalidRoadmapResult
                            validation={preview.validation}
                            onCancel={cancelPreview}
                            onChooseFile={() => fileInputRef.current?.click()}
                        />
                    )}
                </div>
                <FormatAside />
            </div>
        </div>
    );
}
