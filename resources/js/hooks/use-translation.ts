import { usePage } from '@inertiajs/react';
import {
    longDate,
    monthShort,
    relativeDay,
    shortDate,
    translate,
    weekdayAndDay,
    weekdayShort,
} from '@/lib/i18n';
import type { Replacements, TranslationKey } from '@/lib/i18n';

export function useTranslation() {
    const { locale, language_tag: languageTag } = usePage().props;

    return {
        t: (key: TranslationKey, replacements?: Replacements) =>
            translate(locale, key, replacements),
        plural: (count: number, one: TranslationKey, many: TranslationKey) =>
            `${count} ${translate(locale, count === 1 ? one : many)}`,
        shortDate: (isoDate: string) => shortDate(languageTag, isoDate),
        longDate: (isoDate: string) => longDate(languageTag, isoDate),
        weekdayAndDay: (isoDate: string) => weekdayAndDay(languageTag, isoDate),
        monthShort: (monthIndex: number) => monthShort(languageTag, monthIndex),
        weekdayShort: (weekdayIndex: number) =>
            weekdayShort(languageTag, weekdayIndex),
        relativeDay: (daysAgo: number) => relativeDay(languageTag, daysAgo),
    };
}
