import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationEN from './Localize/en/translation.json';
import translationFA from './Localize/fa/translation.json';
import LanguageDetector from 'i18next-browser-languagedetector';

// the translations
const resources = {
    en: {
        translation: translationEN,
    },
    fa: {
        translation: translationFA
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "en",
        fallbackLng: "fa",
        keySeparator: false, // we do not use keys in form messages.welcome

        interpolation: {
            escapeValue: false // react already safes from xss
        },
        react: {
            wait: true
        }
    })
    ;

export default i18n;