<?php

namespace App\Models;

use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @property int $id
 * @property int $topic_id
 * @property CarbonImmutable $studied_on
 * @property string $started_at
 * @property int $duration_minutes
 * @property list<string> $activities
 * @property string|null $note
 */
class StudySession extends Model
{
    protected $guarded = [];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'studied_on' => 'date',
            'activities' => 'array',
        ];
    }

    /**
     * @return BelongsTo<Topic, $this>
     */
    public function topic(): BelongsTo
    {
        return $this->belongsTo(Topic::class);
    }
}
