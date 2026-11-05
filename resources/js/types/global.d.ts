import type { Locale } from '@/lib/i18n';

declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            name: string;
            locale: Locale;
            language_tag: string;
            native: boolean;
            [key: string]: unknown;
        };
    }
}

export {};
