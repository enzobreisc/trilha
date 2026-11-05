import { sampleActiveTopicId, sampleTopicTree } from '@/lib/sample-data';
import { sampleRoadmaps } from '@/lib/sample/start';
import type { SearchAction, SearchTopic } from '@/types/overlay';

const SAMPLE_ROADMAP_NAME = sampleRoadmaps[0].name;

export const sampleSearchTopics: SearchTopic[] = sampleTopicTree.flatMap(
    (section) =>
        section.groups.flatMap((group) =>
            group.topics.map((topic) => ({
                id: topic.id,
                title: topic.title,
                status: topic.status,
                href: topic.href,
                roadmapName: SAMPLE_ROADMAP_NAME,
                location: `${section.number} ${section.name} / ${group.name}`,
            })),
        ),
);

export const sampleSearchActions: SearchAction[] = [
    {
        id: 'log-session',
        label: 'Registrar sessão',
        href: `/topics/${sampleActiveTopicId}`,
    },
    {
        id: 'add-roadmap',
        label: 'Adicionar roadmap',
        href: '/import',
    },
];
