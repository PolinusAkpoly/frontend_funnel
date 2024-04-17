import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

import translationsEN from './locales/en.json';
import translationsFR from './locales/fr.json';
import translationsDE from './locales/de.json';
import translationsES from './locales/es.json';
import translationsIT from './locales/it.json';
import translationsRU from './locales/ru.json';
import translationsUK from './locales/uk.json';
import translationsNL from './locales/nl.json';

// Lire la langue stockée dans localStorage
const storedLanguage = localStorage.getItem('selectedLanguage');

i18n
  .use(initReactI18next) // ajoutez le plugin React
  .init({
    resources: {
      en: {
        translation: translationsEN,
      },
      fr: {
        translation: translationsFR,
      },
      es: {
        translation: translationsES,
      },
      it: {
        translation: translationsIT,
      },
      ru: {
        translation: translationsRU,
      },
      uk: {
        translation: translationsUK,
      },
      de: {
        translation: translationsDE,
      },
      nl: {
        translation: translationsNL,
      },
    },
    lng: storedLanguage || 'en', // Utilisez la langue stockée ou la langue par défaut
    fallbackLng: 'en', // langue de secours si une traduction n'est pas disponible
    debug: process.env.NODE_ENV === "development", // activez le mode de débogage
    interpolation: {
      escapeValue: false, // ne pas échapper les valeurs HTML
    },
  });

export default i18n;
