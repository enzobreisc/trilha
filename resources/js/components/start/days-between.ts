const DAY_MS = 24 * 60 * 60 * 1000;

export function daysBetween(startDate: string, endDate: string): number {
    return Math.round((Date.parse(endDate) - Date.parse(startDate)) / DAY_MS);
}
