<?php

namespace App\Queries;

use App\Models\Roadmap;
use App\Models\Section;
use App\Models\Topic;
use App\Models\TopicGroup;
use Illuminate\Support\Collection;

class TopicTree
{
    /**
     * @return Collection<int, Section>
     */
    public function for(Roadmap $roadmap): Collection
    {
        return $roadmap->sections()
            ->with(['groups.topics' => fn ($topics) => $topics->active()->withDueReviewFlag()])
            ->get()
            ->each(fn (Section $section) => $section->setRelation(
                'groups',
                $section->groups->filter(fn (TopicGroup $group) => $group->topics->isNotEmpty())->values(),
            ))
            ->filter(fn (Section $section) => $section->groups->isNotEmpty())
            ->values();
    }

    /**
     * @param  Collection<int, Section>  $sections
     * @return Collection<int, Topic>
     */
    public function topics(Collection $sections): Collection
    {
        return $sections->flatMap(fn (Section $section) => $section->groups->flatMap(fn (TopicGroup $group) => $group->topics))->values();
    }

    public static function sectionNumber(Section $section): string
    {
        return sprintf('%02d', $section->position + 1);
    }

    public static function breadcrumb(Section $section, TopicGroup $group): string
    {
        return sprintf('%s %s / %s', self::sectionNumber($section), $section->key, $group->key);
    }

    public static function href(Roadmap $roadmap, Topic $topic): string
    {
        return route('topics.show', [$roadmap, $topic], absolute: false);
    }
}
