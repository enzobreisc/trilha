export type HeatLevel = 0 | 1 | 2 | 3 | 4;

export type ContributionDay = {
    date: string;
    level: HeatLevel;
};
