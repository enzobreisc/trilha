import { NotesSection } from '@/components/topic/notes-section';
import { ReviewHistorySection } from '@/components/topic/review-history-section';
import { SessionHistorySection } from '@/components/topic/session-history-section';
import { SourcesSection } from '@/components/topic/sources-section';
import { TopicColumns } from '@/components/topic/topic-columns';
import type { TopicTabProps } from '@/components/topic/topic-tabs';

export function HistoryTab({ topic, state, onRegisterSession }: TopicTabProps) {
    return (
        <TopicColumns
            main={
                <>
                    <ReviewHistorySection
                        status={state.status}
                        schedule={topic.schedule}
                    />
                    <SessionHistorySection
                        sessions={topic.sessions}
                        onRegister={onRegisterSession}
                    />
                </>
            }
            aside={
                <>
                    <NotesSection
                        notes={state.notes}
                        onNotesChange={state.setNotes}
                    />
                    <SourcesSection sources={topic.sources} />
                </>
            }
        />
    );
}
