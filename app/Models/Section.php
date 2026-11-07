<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property int $roadmap_id
 * @property string $key
 * @property string $title
 * @property int $position
 */
class Section extends Model
{
    protected $guarded = [];

    /**
     * @return BelongsTo<Roadmap, $this>
     */
    public function roadmap(): BelongsTo
    {
        return $this->belongsTo(Roadmap::class);
    }

    /**
     * @return HasMany<TopicGroup, $this>
     */
    public function groups(): HasMany
    {
        return $this->hasMany(TopicGroup::class)->orderBy('position');
    }
}
