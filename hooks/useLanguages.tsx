import i18n from "@/i18n";
import { useState, useEffect, useCallback } from "react";

export function useLanguage() {
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

    useEffect(() => {
        const listener = (lng: string) => {
            setCurrentLanguage(lng);
        };

        i18n.on("languageChanged", listener);
        return () => {
            i18n.off("languageChanged", listener);
        };
    }, []);

    const toggleLanguage = useCallback(() => {
        const next = currentLanguage === "fr" ? "en" : "fr";
        i18n.changeLanguage(next);
    }, [currentLanguage]);

    const setLanguage = useCallback((lng: string) => {
        i18n.changeLanguage(lng);
    }, []);

    return {
        currentLanguage,
        toggleLanguage,
        setLanguage,
    };
}
