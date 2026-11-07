import { usePage } from '@inertiajs/react';
import type { AppChrome } from '@/types/app-chrome';

export function useChrome(): AppChrome {
    return usePage().props.chrome;
}

export function useToday(): string {
    return usePage().props.today;
}
