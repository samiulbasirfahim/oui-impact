import { useLoadInterstitialAds } from "@/hooks/intersitialAd";
import { Stack } from "expo-router";

export default function RootLayout() {
    useLoadInterstitialAds();

    return <Stack screenOptions={{
        headerShown: false
    }} />;
}
