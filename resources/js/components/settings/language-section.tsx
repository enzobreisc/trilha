import { useState } from 'react';
import { PillRadioGroup } from '@/components/settings/pill-radio-group';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import type { Locale, TranslationKey } from '@/lib/i18n';

const LANGUAGE_OPTIONS: { value: Locale; label: TranslationKey }[] = [
    { value: 'pt_BR', label: 'português (Brasil)' },
    { value: 'en', label: 'English' },
];

export function LanguageSection({ initialLocale }: { initialLocale: Locale }) {
    const { t } = useTranslation();
    const [locale, setLocale] = useState<Locale>(initialLocale);

    return (
        <Card title={t('idioma')}>
            <PillRadioGroup
                label={t('idioma')}
                options={LANGUAGE_OPTIONS.map((option) => ({
                    value: option.value,
                    label: t(option.label),
                }))}
                value={locale}
                onChange={setLocale}
            />
            <p className="text-xs text-faint">
                {t(
                    'Muda os textos do app. Seus roadmaps continuam no idioma do arquivo.',
                )}
            </p>
        </Card>
    );
}
