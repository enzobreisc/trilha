import { useTranslation } from '@/hooks/use-translation';
import type { ImportMessage } from '@/lib/sample/import';

export function useMessageText() {
    const { t } = useTranslation();

    return (message: ImportMessage) => t(message.key, message.replacements);
}
