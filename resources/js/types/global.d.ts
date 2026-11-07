import type { Locale } from '@/lib/i18n';
import type { AppChrome } from '@/types/app-chrome';

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            locale: Locale;
            language_tag: string;
            native: boolean;
            today: string;
            chrome: AppChrome;
            [key: string]: unknown;
        };
    }
}

export {};
