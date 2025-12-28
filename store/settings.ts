import { UserSettings } from "@/type/settings";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { mmkvZustand } from "./mmkv";
import i18n from "@/i18n";

interface SettignsState {
    userSettings: UserSettings | null;
    setSettings: <K extends keyof UserSettings>(
        key: K,
        value: UserSettings[K],
    ) => void;
    getSettings: <K extends keyof UserSettings>(key: K) => UserSettings[K] | null;
    setLanguage: (language: UserSettings["language"]) => void;
    initLanguage: () => void;
}

export const useSettings = create<SettignsState>()(
    persist(
        (set, get) => ({
            userSettings: null,
            setSettings(key, value) {
                const currentSettings = get().userSettings ?? {};

                set({
                    userSettings: {
                        ...currentSettings,
                        [key]: value,
                    } as UserSettings,
                });
            },
            getSettings(key) {
                const settings = get().userSettings;
                if (!settings) {
                    return null;
                }
                return settings[key];
            },

            setLanguage(language) {
                get().setSettings("language", language);
                i18n.changeLanguage(language);
            },

            initLanguage() {
                i18n.changeLanguage(get().userSettings?.language ?? "en");
            },
        }),
        {
            name: "settings-store",
            storage: createJSONStorage(() => mmkvZustand),
        },
    ),
);
