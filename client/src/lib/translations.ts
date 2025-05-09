import { Language } from './types';

// Import translations for each feature
import { homeTranslations } from './translations/home';
import { navTranslations } from './translations/nav';
import { aibuildersTranslations } from './translations/aibuilders';
import { aitrainersTranslations } from './translations/aitrainers';
import { aiworkforceTranslations } from './translations/aiworkforce';
import { aistoreTranslations } from './translations/aistore';
import { contactTranslations } from './translations/contact';

export const translations = {
  en: {
    ...navTranslations.en,
    ...homeTranslations.en,
    ...aibuildersTranslations.en,
    ...aitrainersTranslations.en,
    ...aiworkforceTranslations.en,
    ...aistoreTranslations.en,
    ...contactTranslations.en,
  },
  ja: {
    ...navTranslations.ja,
    ...homeTranslations.ja,
    ...aibuildersTranslations.ja,
    ...aitrainersTranslations.ja,
    ...aiworkforceTranslations.ja,
    ...aistoreTranslations.ja,
    ...contactTranslations.ja,
  }
};