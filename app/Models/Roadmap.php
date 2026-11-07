<?php

namespace App\Models;

use Carbon\CarbonImmutable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $key
 * @property string $title
 * @property string $source_file
 * @property CarbonImmutable $imported_at
 * @property CarbonImmutable|null $archived_at
 */
class Roadmap extends Model
{
    protected $guarded = [];

    /**
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'imported_at' => 'datetime',
            'archived_at' => 'datetime',
        ];
    }

    public function getRouteKeyName(): string
    {
        return 'key';
    }

    /**
     * @param  Builder<Roadmap>  $query
     */
    public function scopeActive(Builder $query): void
    {
        $query->whereNull('archived_at');
    }

    /**
     * @return HasMany<Section, $this>
     */
    public function sections(): HasMany
    {
        return $this->hasMany(Section::class)->orderBy('position');
    }

    /**
     * @return HasMany<Topic, $this>
     */
    public function topics(): HasMany
    {
        return $this->hasMany(Topic::class);
    }
}
