import type { HeatLevel } from '@/types/contribution';

const CONTRIBUTION_CELL_COUNT = 182;

export const sampleEmptyContributionLevels: HeatLevel[] = Array.from(
    { length: CONTRIBUTION_CELL_COUNT },
    (): HeatLevel => 0,
);
