import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.json';
import arTranslation from './locales/ar/translation.json';
import frTranslation from './locales/fr/translation.json';

const setDirection = (lng) => {
    const direction = lng === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', direction);
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: enTranslation },
            ar: { translation: arTranslation },
            fr: { translation: frTranslation },
        },
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

i18n.on('languageChanged', (lng) => {
    setDirection(lng);
});

setDirection(i18n.language);

export default i18n;