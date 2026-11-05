export type TopicStatus = 'todo' | 'studying' | 'done' | 'review';

export type TopicTreeTopic = {
    id: string;
    title: string;
    status: TopicStatus;
    href: string;
};

export type TopicTreeGroup = {
    name: string;
    topics: TopicTreeTopic[];
};

export type TopicTreeSection = {
    id: string;
    number: string;
    name: string;
    groups: TopicTreeGroup[];
};
