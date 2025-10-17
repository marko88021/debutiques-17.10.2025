import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: false,

    // Default namespace (keeps console quiet if you add others later)
    defaultNS: 'translation',

    interpolation: {
      escapeValue: false,
    },

    backend: {
      // Works whether your Vite base is "/" or a sub-path
      loadPath: `${import.meta.env.BASE_URL}locales/{{lng}}/{{ns}}.json`,
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },

    supportedLngs: ['en', 'de', 'sv', 'da', 'no', 'nl', 'it', 'es', 'fr'],
  });

export default i18n;
