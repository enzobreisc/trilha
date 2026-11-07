<?php

namespace App\Queries;

use App\Models\StudySession;
use Carbon\CarbonImmutable;
use Illuminate\Support\Collection;

class StudyActivity
{
    public const CONTRIBUTION_DAY_COUNT = 182;

    /**
     * @return list<array{date: string, level: int}>
     */
    public function contributionDays(): array
    {
        $firstDay = today()->subDays(self::CONTRIBUTION_DAY_COUNT - 1);
        $minutesByDate = $this->minutesByDate($firstDay);
        $days = [];

        for ($offset = 0; $offset < self::CONTRIBUTION_DAY_COUNT; $offset++) {
            $date = $firstDay->addDays($offset)->toDateString();
            $days[] = ['date' => $date, 'level' => $this->heatLevel($minutesByDate->get($date, 0))];
        }

        return $days;
    }

    public function streakDays(): int
    {
        $studiedDates = StudySession::query()->distinct()->pluck('studied_on')
            ->map(fn ($date) => CarbonImmutable::parse($date)->toDateString())
            ->flip();
        $day = $studiedDates->has(today()->toDateString()) ? today() : today()->subDay();
        $streak = 0;

        while ($studiedDates->has($day->toDateString())) {
            $streak++;
            $day = $day->subDay();
        }

        return $streak;
    }

    public function sessionCountSinceContributionStart(): int
    {
        return StudySession::query()
            ->whereDate('studied_on', '>=', today()->subDays(self::CONTRIBUTION_DAY_COUNT - 1))
            ->count();
    }

    /**
     * @return array{weekStart: string, weekEnd: string, weekMinutes: int, weekSessionCount: int}
     */
    public function week(): array
    {
        $start = today()->startOfWeek();
        $end = today()->endOfWeek();
        $sessions = StudySession::query()->whereDate('studied_on', '>=', $start)->whereDate('studied_on', '<=', $end);

        return [
            'weekStart' => $start->toDateString(),
            'weekEnd' => $end->toDateString(),
            'weekMinutes' => (int) $sessions->clone()->sum('duration_minutes'),
            'weekSessionCount' => $sessions->count(),
        ];
    }

    /**
     * @return Collection<string, int>
     */
    private function minutesByDate(CarbonImmutable $from): Collection
    {
        return StudySession::query()
            ->whereDate('studied_on', '>=', $from)
            ->selectRaw('studied_on, sum(duration_minutes) as minutes')
            ->groupBy('studied_on')
            ->get()
            ->mapWithKeys(fn (StudySession $session) => [
                $session->studied_on->toDateString() => (int) $session->getAttribute('minutes'),
            ]);
    }

    private function heatLevel(int $minutes): int
    {
        /** @var list<int> $thresholds */
        $thresholds = config('trilha.heat_thresholds_in_minutes');

        return count(array_filter($thresholds, fn (int $threshold) => $minutes >= $threshold));
    }
}
