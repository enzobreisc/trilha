import { DataRow } from '@/components/ui/data-row';
import { useTranslation } from '@/hooks/use-translation';
import type { RoadmapPreviewSection } from '@/lib/sample/import';

export function RoadmapPreview({
    sections,
}: {
    sections: RoadmapPreviewSection[];
}) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold text-faint">
                {t('prévia')}
            </span>
            <div className="flex flex-col rounded-sm bg-elevated px-4 inset-ring inset-ring-border">
                {sections.map((section) => (
                    <DataRow
                        key={section.number}
                        label={
                            <>
                                <span className="font-mono text-faint">
                                    {section.number}
                                </span>{' '}
                                {section.name}
                            </>
                        }
                        value={
                            <span className="font-mono">
                                {section.topicCount}
                            </span>
                        }
                    />
                ))}
            </div>
        </div>
    );
}
