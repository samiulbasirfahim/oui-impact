import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";
import * as ExpoNetwork from "expo-network";
import { QueryClientProvider } from "@tanstack/react-query";
import Purchases, { LOG_LEVEL } from "react-native-purchases";

import { useLoadFonts } from "@/hooks/useLoadFonts";
import { router, Stack } from "expo-router";
import { I18nextProvider } from "react-i18next";
import { LogBox, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { Host } from "react-native-portalize";
import { useSettings } from "@/store/settings";
import { useEffect, useState } from "react";
import i18n from "@/i18n";
import { queryClient } from "@/lib/reactQuery";

import * as SplashScreen from "expo-splash-screen";
import { useInitAuth } from "@/queries/useLogin";
import { usePointsValue } from "@/queries/usePoints";

SplashScreen.setOptions({
    duration: 0,
    fade: true,
});

SplashScreen.preventAutoHideAsync();

export default function RootLayoutWrapper() {
    LogBox.ignoreAllLogs(true);
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

    const netInfo = ExpoNetwork.useNetworkState();

    const language = useSettings((s) => s.userSettings?.language);
    const { mutateAsync: initAuth } = useInitAuth();

    const { mutateAsync: fetchPointsConfig } = usePointsValue();

    useEffect(() => {
        Purchases.setLogLevel(LOG_LEVEL.DEBUG);
        if (Platform.OS === "ios") {
            Purchases.configure({
                apiKey: "test_nHckVzCypfSmgaaZZCQIzPhZDrp",
            });
        } else if (Platform.OS === "android") {
            Purchases.configure({
                apiKey: "test_nHckVzCypfSmgaaZZCQIzPhZDrp",
            });
        }
    }, []);

    useEffect(() => {
        if (language) {
            i18n.changeLanguage(language);
        }
    }, [language]);

    useEffect(() => {
        if (
            netInfo.isConnected === false ||
            netInfo.isInternetReachable === false
        ) {
            router.replace("/status/no-internet");
        }

        async function prepare() {
            try {
                await initAuth();
                console.log("Auth initialized on app load");
                await fetchPointsConfig().then((d) => {
                    console.log("Points config fetched on app load:", d);
                });
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
