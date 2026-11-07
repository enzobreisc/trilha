import type { TopicDetail } from '@/components/topic/types';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { PageHeader } from '@/components/ui/page-header';
import { useTranslation } from '@/hooks/use-translation';

export function TopicHeader({ topic }: { topic: TopicDetail }) {
    const { t } = useTranslation();
    const breadcrumbItems = [...topic.path, topic.key].map((label) => ({
        label,
    }));

    return (
        <div className="flex flex-col gap-3">
            <Breadcrumb
                label={t('Caminho do tópico')}
                items={breadcrumbItems}
            />
            <PageHeader
                title={topic.title}
                description={topic.summary ?? undefined}
            />
        </div>
    );
}
