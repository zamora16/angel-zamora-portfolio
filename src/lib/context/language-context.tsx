'use client';

import { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import enDictionary from '@/dictionaries/en.json';
import esDictionary from '@/dictionaries/es.json';

type Language = 'en' | 'es';

type Dictionary = typeof enDictionary;

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  dictionary: Dictionary;
  isTransitioning: boolean;
}

const dictionaries: Record<Language, Dictionary> = {
  en: enDictionary,
  es: esDictionary,
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [dictionary, setDictionary] = useState<Dictionary>(dictionaries.en);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('angel-zamora-lang') as Language;
    const browserLanguage = navigator.language.split('-')[0] as Language;

    let initialLanguage: Language;
    if (storedLanguage && ['en', 'es'].includes(storedLanguage)) {
      initialLanguage = storedLanguage;
    } else if (['en', 'es'].includes(browserLanguage)) {
      initialLanguage = browserLanguage;
    } else {
      initialLanguage = 'en';
    }

    setLanguageState(initialLanguage);
    setDictionary(dictionaries[initialLanguage]);
  }, []);

  const setLanguage = useCallback(
    (lang: Language) => {
      if (lang === language) return;

      setIsTransitioning(true);
      setTimeout(() => {
        setLanguageState(lang);
        setDictionary(dictionaries[lang]);
        try {
          localStorage.setItem('angel-zamora-lang', lang);
        } catch (error) {
          console.error('Could not save language preference:', error);
        }
        setIsTransitioning(false);
      }, 200);
    },
    [language]
  );

  const value = { language, setLanguage, dictionary, isTransitioning };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
