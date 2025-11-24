import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";

import { Host } from "react-native-portalize";
import { Stack } from "expo-router";
import { Platform } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { useLoadInterstitialAds } from "@/hooks/intersitialAd";
import { useLoadFonts } from "@/hooks/useLoadFonts";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
                        <Stack
                            screenOptions={{
                                headerShown: false,
                            }}
                        />
                    </KeyboardProvider>
                </Host>
            </GestureHandlerRootView>
        </>
    );
}
