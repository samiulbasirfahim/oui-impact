import { useLoadInterstitialAds } from "@/components/admob/intersitialAd";
import { Stack } from "expo-router";
import { KeyboardProvider } from "react-native-keyboard-controller";

export default function RootLayout() {
    // useLoadInterstitialAds();


    return (
        <KeyboardProvider>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            />
        </KeyboardProvider>
    );
}
