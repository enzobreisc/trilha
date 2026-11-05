import { Card } from '@/components/ui/card';
import { DataRow } from '@/components/ui/data-row';
import { useTranslation } from '@/hooks/use-translation';

export function AboutSection({
    appVersion,
    roadmapFormat,
}: {
    appVersion: string;
    roadmapFormat: string;
}) {
    const { t } = useTranslation();

    return (
        <Card title={t('sobre')}>
            <div className="flex flex-col">
                <DataRow label={t('versão')} value={appVersion} />
                <DataRow
                    label={t('formato de roadmap')}
                    value={roadmapFormat}
                />
            </div>
        </Card>
    );
}
