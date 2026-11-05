import { useState } from 'react';
import { ContributionsPanel } from '@/components/sessions/contributions-panel';
import { groupSessionsByDay } from '@/components/sessions/group-sessions-by-day';
import {
    SessionFilters,
    ALL_ROADMAPS_FILTER,
} from '@/components/sessions/session-filters';
import { SessionsListPanel } from '@/components/sessions/sessions-list-panel';
import { SessionsSummary } from '@/components/sessions/sessions-summary';
import type {
    SessionEntry,
    SessionPeriod,
    SessionStats,
} from '@/components/sessions/types';
import { PageHeader } from '@/components/ui/page-header';
import { useTranslation } from '@/hooks/use-translation';
import { sampleRoadmaps } from '@/lib/sample/start';
import { sampleSessionStats, sampleSessions } from '@/lib/sample/sessions';
import { sampleContributionDays } from '@/lib/sample-data';
import type { ContributionDay } from '@/types/contribution';

type SessionsPageProps = {
    sessions?: SessionEntry[];
    stats?: SessionStats;
    contributionDays?: ContributionDay[];
    roadmaps?: { id: string; name: string }[];
};

export default function Sessions({
    sessions = sampleSessions,
    stats = sampleSessionStats,
    contributionDays = sampleContributionDays,
    roadmaps = sampleRoadmaps,
}: SessionsPageProps) {
    const { t } = useTranslation();
    const [roadmapFilter, setRoadmapFilter] = useState(ALL_ROADMAPS_FILTER);
    const [period, setPeriod] = useState<SessionPeriod>('7d');
    const [selectedSessionId, setSelectedSessionId] = useState(sessions[0]?.id);

    return (
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-7">
            <PageHeader
                title={t('Sessões')}
                description={t(
                    'Tudo o que você registrou, em todos os roadmaps.',
                )}
            />
            <SessionsSummary
                weekMinutes={stats.weekMinutes}
                totalSessions={stats.totalSessions}
                streakDays={stats.streakDays}
            />
            <SessionFilters
                roadmaps={roadmaps}
                roadmapFilter={roadmapFilter}
                onRoadmapFilterChange={setRoadmapFilter}
                period={period}
                onPeriodChange={setPeriod}
            />
            <div className="grid items-start gap-4 lg:grid-cols-3">
                <SessionsListPanel
                    className="lg:col-span-2"
                    groups={groupSessionsByDay(sessions)}
                    selectedId={selectedSessionId}
                    onSelect={setSelectedSessionId}
                />
                <ContributionsPanel days={contributionDays} />
            </div>
        </div>
    );
}
