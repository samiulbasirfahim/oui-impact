import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";

import { useLoadFonts } from "@/hooks/useLoadFonts";
import { Stack } from "expo-router";
import { I18nextProvider } from "react-i18next";
import { Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { Host } from "react-native-portalize";

export default function RootLayout() {
    const ready = useLoadFonts();

    if (Platform.OS === "android") NavigationBar.setStyle("light");

    if (!ready) {
        return null;
    }

    return (
        <>
            <StatusBar style="dark" />
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
