import {
    useId,
    useRef,
    useState,
    type FormEvent,
    type MouseEvent,
} from 'react';
import { ArchiveRoadmapRow } from '@/components/manage-roadmap/archive-roadmap-row';
import { DeleteRoadmapZone } from '@/components/manage-roadmap/delete-roadmap-zone';
import { RoadmapIdentityFields } from '@/components/manage-roadmap/roadmap-identity-fields';
import { sampleManagedRoadmap } from '@/components/manage-roadmap/sample-managed-roadmap';
import type { ManagedRoadmap } from '@/components/manage-roadmap/types';
import {
    DIALOG_ELEMENT_CLASSES,
    DIALOG_SURFACE_CLASSES,
} from '@/components/session/dialog-classes';
import { DialogHeader } from '@/components/session/dialog-header';
import { useModalDialog } from '@/components/session/use-modal-dialog';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

export type ManageRoadmapDialogProps = {
    open: boolean;
    onClose: () => void;
    roadmap?: ManagedRoadmap;
};

export default function ManageRoadmapDialog({
    open,
    onClose,
    roadmap = sampleManagedRoadmap,
}: ManageRoadmapDialogProps) {
    if (!open) {
        return null;
    }

    return <ManageRoadmapModal roadmap={roadmap} onClose={onClose} />;
}

function ManageRoadmapModal({
    roadmap,
    onClose,
}: {
    roadmap: ManagedRoadmap;
    onClose: () => void;
}) {
    const { t } = useTranslation();
    const titleId = useId();
    const nameInputRef = useRef<HTMLInputElement>(null);
    const dialogRef = useModalDialog(nameInputRef);
    const [name, setName] = useState(roadmap.name);

    function handleBackdropMouseDown(event: MouseEvent<HTMLDialogElement>) {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onClose();
    }

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby={titleId}
            onClose={onClose}
            onMouseDown={handleBackdropMouseDown}
            className={cn(DIALOG_ELEMENT_CLASSES, 'max-w-175')}
        >
            <form onSubmit={handleSubmit} className={DIALOG_SURFACE_CLASSES}>
                <DialogHeader
                    titleId={titleId}
                    title={t('Gerenciar roadmap')}
                    onClose={onClose}
                />
                <div className="flex flex-col gap-6 px-6 py-4">
                    <RoadmapIdentityFields
                        roadmap={roadmap}
                        name={name}
                        nameInputRef={nameInputRef}
                        onNameChange={setName}
                    />
                    <ArchiveRoadmapRow />
                    <DeleteRoadmapZone roadmap={roadmap} />
                </div>
                <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-6 py-4">
                    <span className="text-xs text-faint">
                        {t('alterações no nome só valem ao salvar')}
                    </span>
                    <div className="flex gap-2.5">
                        <Button variant="secondary" onClick={onClose}>
                            {t('Cancelar')}
                        </Button>
                        <Button type="submit">{t('Salvar')}</Button>
                    </div>
                </footer>
            </form>
        </dialog>
    );
}
