import type { TopicDetail } from '@/components/topic/types';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { useTranslation } from '@/hooks/use-translation';

const ROADMAP_ROUTE = '/roadmap';

export function TopicHeader({
    topic,
    onRegisterSession,
}: {
    topic: TopicDetail;
    onRegisterSession: () => void;
}) {
    const { t } = useTranslation();
    const breadcrumbItems = [...topic.path, topic.key].map((label, index) => ({
        label,
        href: index === 0 ? ROADMAP_ROUTE : undefined,
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
                actions={
                    <Button onClick={onRegisterSession}>
                        {t('Registrar sessão')}
                    </Button>
                }
            />
        </div>
    );
}
