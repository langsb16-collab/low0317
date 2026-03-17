import { useState, useEffect } from 'react';
import { Locale, translations } from '../locales';

export function useTranslation() {
  const [locale, setLocale] = useState<Locale>(() => {
    const saved = localStorage.getItem('locale');
    return (saved as Locale) || 'ko';
  });

  useEffect(() => {
    localStorage.setItem('locale', locale);
  }, [locale]);

  const t = (key: string) => {
    return translations[locale]?.[key] || translations['en']?.[key] || key;
  };

  return { t, locale, setLocale };
}
