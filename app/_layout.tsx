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
import { useEffect, useState } from "react";
import i18n from "@/i18n";
import { queryClient } from "@/lib/reactQuery";

import * as SplashScreen from "expo-splash-screen";
import { useInitAuth } from "@/queries/useLogin";

SplashScreen.setOptions({
    duration: 0,
    fade: true,
});

SplashScreen.preventAutoHideAsync();

export default function RootLayoutWrapper() {
    return (
        <QueryClientProvider client={queryClient}>
            <StatusBar style="dark" />
            <RootLayout />
        </QueryClientProvider>
    );
}

export function RootLayout() {
    const fontLoaded = useLoadFonts();
    const [ready, setReady] = useState(false);

    const language = useSettings((s) => s.userSettings?.language);
    const { mutateAsync: initAuth } = useInitAuth();

    useEffect(() => {
        if (language) {
            i18n.changeLanguage(language);
        }
    }, [language]);

    useEffect(() => {
        async function prepare() {
            try {
                await initAuth();
            } catch (e) {
                //  ignore errors
            } finally {
                setReady(true);
                await SplashScreen.hideAsync();
            }
        }

        if (fontLoaded) {
            prepare();
        }
    }, [fontLoaded]);

    if (Platform.OS === "android") NavigationBar.setStyle("light");

    if (!ready) {
        return null;
    }

    return (
        <>
            <GestureHandlerRootView>
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
            </GestureHandlerRootView>
        </>
    );
}
