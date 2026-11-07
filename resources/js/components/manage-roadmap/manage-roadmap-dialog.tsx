import { router } from '@inertiajs/react';
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
import type { ManagedRoadmap } from '@/components/manage-roadmap/types';
import { DIALOG_ELEMENT_CLASSES } from '@/components/session/dialog-classes';
import { useModalDialog } from '@/components/session/use-modal-dialog';
import { Button } from '@/components/ui/button';
import { Kbd } from '@/components/ui/kbd';
import { useTranslation } from '@/hooks/use-translation';
import { cn } from '@/lib/utils';

export type ManageRoadmapDialogProps = {
    roadmap: ManagedRoadmap;
    onClose: () => void;
};

export default function ManageRoadmapDialog({
    roadmap,
    onClose,
}: ManageRoadmapDialogProps) {
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
        router.put(
            `/roadmaps/${roadmap.id}`,
            { title: name },
            { preserveScroll: true, onSuccess: onClose },
        );
    }

    return (
        <dialog
            ref={dialogRef}
            aria-labelledby={titleId}
            onClose={onClose}
            onMouseDown={handleBackdropMouseDown}
            className={cn(DIALOG_ELEMENT_CLASSES, 'max-w-175')}
        >
            <form
                onSubmit={handleSubmit}
                className="flex flex-col overflow-hidden rounded-sm bg-bg inset-ring inset-ring-strong"
            >
                <header className="flex items-center justify-between gap-3 border-b border-border bg-chrome px-5 py-3">
                    <h2
                        id={titleId}
                        className="font-mono text-[11px] tracking-[0.08em] text-muted uppercase"
                    >
                        {t('Gerenciar roadmap')}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex items-center gap-2 font-mono text-xs text-muted hover:text-text"
                    >
                        {t('Fechar')}
                        <Kbd>esc</Kbd>
                    </button>
                </header>
                <div className="flex flex-col gap-6 px-6 py-5">
                    <RoadmapIdentityFields
                        roadmap={roadmap}
                        name={name}
                        nameInputRef={nameInputRef}
                        onNameChange={setName}
                    />
                    <ArchiveRoadmapRow roadmap={roadmap} />
                    <DeleteRoadmapZone roadmap={roadmap} />
                </div>
                <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-chrome px-6 py-4">
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
