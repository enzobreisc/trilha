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
    return (
        <TopicColumns
            main={
                <>
                    <StatusSection
                        status={state.status}
                        onStatusChange={state.setStatus}
                    />
                    <ChecklistSection
                        items={topic.checklist}
                        checkedItems={state.checkedItems}
                        onToggle={state.toggleItem}
                    />
                    <SignalSection
                        bad={topic.signals.bad}
                        good={topic.signals.good}
                    />
                    <AiPromptSection
                        prompt={topic.ai_prompt}
                        reviewChecks={topic.review_checks}
                    />
                    <ExerciseSection exercise={topic.exercise} />
                </>
            }
            aside={
                <>
                    <SessionSummarySection
                        sessions={topic.sessions}
                        onRegister={onRegisterSession}
                    />
                    <NextReviewsSection
                        status={state.status}
                        schedule={topic.schedule}
                    />
                </>
            }
        />
    );
}
