const DAY_MS = 24 * 60 * 60 * 1000;

export function daysBetween(startDate: string, endDate: string): number {
    return Math.round((Date.parse(endDate) - Date.parse(startDate)) / DAY_MS);
}

export function shiftIsoDate(isoDate: string, days: number): string {
    return new Date(Date.parse(isoDate) + days * DAY_MS)
        .toISOString()
        .slice(0, 10);
}

export function weekdayIndexOf(isoDate: string): number {
    return new Date(`${isoDate}T00:00:00Z`).getUTCDay();
}
