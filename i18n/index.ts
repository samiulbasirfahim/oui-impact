import * as Localization from "react-native-localize";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../locales/en.json";
import fr from "../locales/fr.json";

const resources = {
    en: { translation: en },
    fr: { translation: fr },
};

const fallback = "fr";

const languageDetector = {
    type: "languageDetector",
    async: true,
    detect: (callback: (lng: string) => void) => {
        const locales = Localization.getLocales();
        if (locales.length > 0) {
            callback(locales[0].languageCode);
        } else {
            callback(fallback);
        }
    },
    init: () => { },
    cacheUserLanguage: () => { },
};

i18n
    .use(languageDetector as any)
    .use(initReactI18next)
    .init({
        compatibilityJSON: "v4",
        resources,
        fallbackLng: fallback,
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
