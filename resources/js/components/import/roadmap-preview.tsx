import { SectionLabel } from '@/components/ui/section-label';
import { useTranslation } from '@/hooks/use-translation';
import type { RoadmapPreviewSection } from '@/lib/sample/import';

export function RoadmapPreview({
    sections,
}: {
    sections: RoadmapPreviewSection[];
}) {
    const { t } = useTranslation();

    return (
        <div className="flex flex-col gap-2 border-t border-border pt-4">
            <SectionLabel>{t('prévia')}</SectionLabel>
            <div className="flex flex-col">
                {sections.map((section) => (
                    <div
                        key={section.number}
                        className="flex items-baseline gap-3 py-0.5"
                    >
                        <span className="w-6.5 shrink-0 font-mono text-xs text-muted">
                            {section.number}
                        </span>
                        <span className="flex-1 text-sm text-text">
                            {section.name}
                        </span>
                        <span className="font-mono text-xs text-muted">
                            {section.topicCount}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
