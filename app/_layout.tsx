import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import { QueryClientProvider } from "@tanstack/react-query";

import { useLoadFonts } from "@/hooks/useLoadFonts";
import { Stack } from "expo-router";
import { I18nextProvider } from "react-i18next";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { Host } from "react-native-portalize";
import { useSettings } from "@/store/settings";
import { useEffect } from "react";
import i18n from "@/i18n";
import { queryClient } from "@/lib/reactQuery";

export default function RootLayout() {
    const ready = useLoadFonts();
    const language = useSettings((s) => s.userSettings?.language);

    useEffect(() => {
        if (language) {
            i18n.changeLanguage(language);
        }
    }, [language]);

    if (Platform.OS === "android") NavigationBar.setStyle("light");

    if (!ready) {
        return null;
    }

    return (
        <>
            <StatusBar style="dark" />
            <GestureHandlerRootView>
                <QueryClientProvider client={queryClient}>
                    <Host>
                        <KeyboardProvider>
                            <I18nextProvider i18n={require("@/i18n").default}>
                                <Stack
                                    screenOptions={{
                                        headerShown: false,
                                    }}
                                />
                            </I18nextProvider>
                        </KeyboardProvider>
                    </Host>
                </QueryClientProvider>
            </GestureHandlerRootView>
        </>
    );
}
