import type { TranslationKey } from '@/lib/i18n';

const NOON_HOUR = 12;
const EVENING_HOUR = 18;

export function greetingKeyFor(hour: number): TranslationKey {
    if (hour < NOON_HOUR) {
        return 'Bom dia, :name';
    }
    return hour < EVENING_HOUR ? 'Boa tarde, :name' : 'Boa noite, :name';
}
