import { useRef, useState } from 'react';
import type {
    ImportMode,
    ImportResults,
    InvalidRoadmapImport,
    NewRoadmapImport,
    UpdatedRoadmapImport,
} from '@/lib/sample/import';

export type ImportView =
    | { kind: 'empty' }
    | { kind: 'new'; validation: NewRoadmapImport }
    | { kind: 'update'; validation: UpdatedRoadmapImport }
    | { kind: 'invalid'; validation: InvalidRoadmapImport };

type ImportViewInput = {
    results: ImportResults;
    mode: ImportMode;
    isResultVisible: boolean;
    isFileInvalid: boolean;
};

function resolveImportView({
    results,
    mode,
    isResultVisible,
    isFileInvalid,
}: ImportViewInput): ImportView {
    if (!isResultVisible) {
        return { kind: 'empty' };
    }

    if (isFileInvalid) {
        return { kind: 'invalid', validation: results.invalid };
    }

    if (mode === 'update') {
        return { kind: 'update', validation: results.update };
    }

    return { kind: 'new', validation: results.new };
}

export function useImportPage({
    results,
    isSampleFileInvalid,
}: {
    results: ImportResults;
    isSampleFileInvalid: boolean;
}) {
    const [mode, setMode] = useState<ImportMode>('new');
    const [isResultVisible, setIsResultVisible] = useState(true);
    const [isFileInvalid, setIsFileInvalid] = useState(isSampleFileInvalid);
    const fileInputRef = useRef<HTMLInputElement>(null);

    function selectMode(nextMode: ImportMode) {
        setMode(nextMode);
        setIsResultVisible(true);
        setIsFileInvalid(false);
    }

    function showResult() {
        setIsResultVisible(true);
        setIsFileInvalid(isSampleFileInvalid);
    }

    function hideResult() {
        setIsResultVisible(false);
    }

    function openFilePicker() {
        fileInputRef.current?.click();
    }

    return {
        mode,
        fileInputRef,
        view: resolveImportView({
            results,
            mode,
            isResultVisible,
            isFileInvalid,
        }),
        selectMode,
        showResult,
        hideResult,
        openFilePicker,
    };
}
