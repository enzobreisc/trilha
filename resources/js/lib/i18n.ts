import en from '../../../lang/en.json';

export type Locale = 'pt_BR' | 'en';

export type TranslationKey = keyof typeof en;

export type Replacements = Record<string, string | number>;

const dictionaries: Record<Locale, Record<string, string>> = {
    pt_BR: {},
    en,
};

function fillReplacements(text: string, replacements?: Replacements): string {
    if (replacements === undefined) {
        return text;
    }

    return text.replace(/:(\w+)/g, (match, name: string) =>
        name in replacements ? String(replacements[name]) : match,
    );
}

/** Portuguese is the source language: its keys are the text itself. */
export function translate(
    locale: Locale,
    key: TranslationKey,
    replacements?: Replacements,
): string {
    return fillReplacements(dictionaries[locale][key] ?? key, replacements);
}

function isEnglish(languageTag: string): boolean {
    return languageTag.startsWith('en');
}

function formatUtc(
    languageTag: string,
    date: Date,
    options: Intl.DateTimeFormatOptions,
): string {
    return new Intl.DateTimeFormat(languageTag, {
        ...options,
        timeZone: 'UTC',
    }).format(date);
}

function withoutTrailingPeriod(text: string): string {
    return text.replace(/\.$/, '');
}

function utcDateOf(isoDate: string): Date {
    const [year, month, day] = isoDate.split('-').map(Number);
    return new Date(Date.UTC(year, month - 1, day));
}

/** Short month name for a zero-based month index: "nov" (pt-BR) or "Nov" (en-US). */
export function monthShort(languageTag: string, monthIndex: number): string {
    return withoutTrailingPeriod(
        formatUtc(languageTag, new Date(Date.UTC(2000, monthIndex, 1)), {
            month: 'short',
        }),
    );
}

/** Short weekday name for a JavaScript weekday index (0 is Sunday). */
export function weekdayShort(
    languageTag: string,
    weekdayIndex: number,
): string {
    return withoutTrailingPeriod(
        formatUtc(languageTag, new Date(Date.UTC(2024, 0, 7 + weekdayIndex)), {
            weekday: 'short',
        }),
    );
}

/** "2026-11-03" becomes "3 nov" (pt-BR) or "Nov 3" (en-US). */
export function shortDate(languageTag: string, isoDate: string): string {
    const date = utcDateOf(isoDate);
    const day = date.getUTCDate();
    const month = monthShort(languageTag, date.getUTCMonth());

    return isEnglish(languageTag) ? `${month} ${day}` : `${day} ${month}`;
}

/** "2026-11-04" becomes "qua 4" (pt-BR) or "Wed 4" (en-US). */
export function weekdayAndDay(languageTag: string, isoDate: string): string {
    const date = utcDateOf(isoDate);

    return `${weekdayShort(languageTag, date.getUTCDay())} ${date.getUTCDate()}`;
}

/** "2026-11-03" becomes "03/11/2026" (pt-BR) or "11/03/2026" (en-US). */
export function longDate(languageTag: string, isoDate: string): string {
    return formatUtc(languageTag, utcDateOf(isoDate), {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

/** Days before today: "ontem" or "anteontem" (pt-BR), "yesterday" or "2 days ago" (en-US). */
export function relativeDay(languageTag: string, daysAgo: number): string {
    return new Intl.RelativeTimeFormat(languageTag, {
        numeric: 'auto',
    }).format(-daysAgo, 'day');
}
