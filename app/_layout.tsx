import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";

import { Stack } from "expo-router";
import { Platform } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";
import { useLoadInterstitialAds } from "@/hooks/intersitialAd";
import { useLoadFonts } from "@/hooks/useLoadFonts";

export default function RootLayout() {
    // useLoadInterstitialAds()

    const ready = useLoadFonts();

    if (Platform.OS === "android") NavigationBar.setStyle("light");

    return (
        <>
            <StatusBar style="dark" />
            <KeyboardProvider>
                <Stack
                    screenOptions={{
                        headerShown: false,
                    }}
                />
            </KeyboardProvider>
        </>
    );
}
