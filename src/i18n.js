import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


import en from './locales/en.json';
import id from './locales/id.json';
import {langHandler} from "@/utils/langHandler.js";

const language =  langHandler.get();

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: en },
        id: { translation: id },

    },
    lng: language,
    fallbackLng: language,
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
