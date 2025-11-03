import { useLoadInterstitialAds } from "@/components/admob/intersitialAd";
import * as NavigationBar from "expo-navigation-bar";
import { StatusBar } from "expo-status-bar";

import { Stack } from "expo-router";
import { Platform } from "react-native";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function RootLayout() {
    // useLoadInterstitialAds();

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
