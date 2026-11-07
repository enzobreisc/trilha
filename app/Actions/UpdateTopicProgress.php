<?php

namespace App\Actions;

use App\Enums\TopicStatus;
use App\Models\Topic;

class UpdateTopicProgress
{
    public function __construct(private readonly ChangeTopicStatus $changeStatus) {}

    /**
     * @param  array{status?: string, checkedItems?: list<int>, notes?: string|null, isExerciseCompleted?: bool}  $changes
     */
    public function handle(Topic $topic, array $changes): void
    {
        if (array_key_exists('checkedItems', $changes)) {
            $topic->checked_items = array_values(array_unique($changes['checkedItems']));
        }

        if (array_key_exists('notes', $changes)) {
            $topic->notes = $changes['notes'];
        }

        if (array_key_exists('isExerciseCompleted', $changes)) {
            $topic->exercise_completed_on = $changes['isExerciseCompleted'] ? today() : null;
        }

        $topic->save();

        if (array_key_exists('status', $changes)) {
            $this->changeStatus->handle($topic, TopicStatus::from($changes['status']));
        }
    }
}
