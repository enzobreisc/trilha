import { AiPromptSection } from '@/components/topic/ai-prompt-section';
import { ChecklistSection } from '@/components/topic/checklist-section';
import { ExerciseSection } from '@/components/topic/exercise-section';
import { NextReviewsSection } from '@/components/topic/next-reviews-section';
import { SessionSummarySection } from '@/components/topic/session-summary-section';
import { SignalSection } from '@/components/topic/signal-section';
import { StatusSection } from '@/components/topic/status-section';
import { TopicColumns } from '@/components/topic/topic-columns';
import type { TopicTabProps } from '@/components/topic/topic-tabs';

export function StudyTab({ topic, state, onRegisterSession }: TopicTabProps) {
    const hasSignals = topic.signals?.bad || topic.signals?.good;

    return (
        <TopicColumns
            main={
                <>
                    <StatusSection
                        status={state.status}
                        onStatusChange={state.setStatus}
                    />
                    {topic.checklist.length > 0 && (
                        <ChecklistSection
                            items={topic.checklist}
                            checkedItems={state.checkedItems}
                            onToggle={state.toggleItem}
                        />
                    )}
                    {topic.signals && hasSignals && (
                        <SignalSection signals={topic.signals} />
                    )}
                    {topic.aiPrompt && (
                        <AiPromptSection
                            prompt={topic.aiPrompt}
                            reviewChecks={topic.reviewChecks}
                        />
                    )}
                    {topic.exercise && (
                        <ExerciseSection
                            exercise={topic.exercise}
                            onToggleCompleted={state.toggleExercise}
                        />
                    )}
                </>
            }
            aside={
                <>
                    <SessionSummarySection
                        sessions={topic.sessions}
                        onRegister={onRegisterSession}
                    />
                    <NextReviewsSection topic={topic} />
                </>
            }
        />
    );
}
