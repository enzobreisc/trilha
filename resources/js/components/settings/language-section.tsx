import { useState } from 'react';
import { SettingsSection } from '@/components/settings/settings-section';
import { TextRadioGroup } from '@/components/settings/text-radio-group';
import { useTranslation } from '@/hooks/use-translation';
import type { Locale, TranslationKey } from '@/lib/i18n';

const LANGUAGE_OPTIONS: { value: Locale; label: TranslationKey }[] = [
    { value: 'pt_BR', label: 'português (Brasil)' },
    { value: 'en', label: 'English' },
];

export function LanguageSection({
    index,
    initialLocale,
}: {
    index: number;
    initialLocale: Locale;
}) {
    const { t } = useTranslation();
    const [locale, setLocale] = useState<Locale>(initialLocale);

    return (
        <SettingsSection title={t('idioma')} index={index}>
            <TextRadioGroup
                label={t('idioma')}
                options={LANGUAGE_OPTIONS.map((option) => ({
                    value: option.value,
                    label: t(option.label),
                }))}
                value={locale}
                onChange={setLocale}
            />
            <p className="font-mono text-xs text-muted">
                {t(
                    'Muda os textos do app. Seus roadmaps continuam no idioma do arquivo.',
                )}
            </p>
        </SettingsSection>
    );
}
