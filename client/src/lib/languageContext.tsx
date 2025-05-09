
import { createContext, useContext, useState, ReactNode } from 'react';
import { Language, translations } from './translations';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  getLangValue: <T extends { [key in Language]: any }>(obj: T, fallbackLang?: Language) => T[Language];
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (path: string) => {
    const keys = path.split('.');
    let current: any = translations[language];
    
    for (const key of keys) {
      if (current[key] === undefined) {
        return path;
      }
      current = current[key];
    }
    
    return current;
  };

  const getLangValue = <T extends { [key in Language]: any }>(obj: T, fallbackLang: Language = 'en'): T[Language] => {
    return obj[language] || obj[fallbackLang];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, getLangValue }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
