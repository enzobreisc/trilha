import { DropZone } from '@/components/import/drop-zone';
import { FormatAside } from '@/components/import/format-aside';
import { ImportTabs } from '@/components/import/import-tabs';
import { InvalidRoadmapResult } from '@/components/import/invalid-roadmap-result';
import { NewRoadmapResult } from '@/components/import/new-roadmap-result';
import { UpdatedRoadmapResult } from '@/components/import/updated-roadmap-result';
import { useImportPage } from '@/components/import/use-import-page';
import { PageHeader } from '@/components/ui/page-header';
import { useTranslation } from '@/hooks/use-translation';
import { sampleImportResults, type ImportResults } from '@/lib/sample/import';

type ImportPageProps = {
    results?: ImportResults;
    isSampleFileInvalid?: boolean;
};

export default function Import({
    results = sampleImportResults,
    isSampleFileInvalid = false,
}: ImportPageProps) {
    const { t } = useTranslation();
    const page = useImportPage({ results, isSampleFileInvalid });
    const { view } = page;

    return (
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-7">
            <PageHeader
                title={t('Adicionar ou atualizar roadmap')}
                description={t(
                    'O arquivo é conferido antes de qualquer mudança. Nada entra no banco até você confirmar.',
                )}
            />
            <ImportTabs mode={page.mode} onSelect={page.selectMode} />
            <div className="flex flex-wrap items-start gap-7">
                <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-7">
                    <DropZone
                        inputRef={page.fileInputRef}
                        onFileSelect={page.showResult}
                    />
                    {view.kind === 'new' && (
                        <NewRoadmapResult
                            validation={view.validation}
                            onCancel={page.hideResult}
                        />
                    )}
                    {view.kind === 'update' && (
                        <UpdatedRoadmapResult
                            validation={view.validation}
                            onCancel={page.hideResult}
                        />
                    )}
                    {view.kind === 'invalid' && (
                        <InvalidRoadmapResult
                            validation={view.validation}
                            onCancel={page.hideResult}
                            onChooseFile={page.openFilePicker}
                            onSelectMode={page.selectMode}
                        />
                    )}
                </div>
                <FormatAside />
            </div>
        </div>
    );
}
