import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from './languages/en.json';
import de from './languages/de.json';

function map2resources(languages, namespace = 'translation') {
  const resources = {};
  Object.keys(languages).forEach(key => {
    resources[key] = { [namespace]: languages[key] }
  });
  return resources;
};

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources: map2resources({ en, de }),
    fallbackLng: 'en',
    debug: true,
    keySeparator: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });
  
export default i18n;