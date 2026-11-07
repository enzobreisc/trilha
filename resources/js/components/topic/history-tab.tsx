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
                    <ReviewHistorySection topic={topic} />
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
                        isSaved={state.isNotesSaved}
                        onNotesChange={state.setNotes}
                    />
                    {topic.sources.length > 0 && (
                        <SourcesSection sources={topic.sources} />
                    )}
                </>
            }
        />
    );
}
