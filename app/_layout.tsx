import { useLoadInterstitialAds } from "@/components/admob/intersitialAd";
import { Stack } from "expo-router";

export default function RootLayout() {
    useLoadInterstitialAds();
    return <Stack />;
}
