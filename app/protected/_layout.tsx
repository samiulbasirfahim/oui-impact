import { useLoadInterstitialAds } from "@/hooks/intersitialAd";
import { Slot } from "expo-router";

export function RootLayout() {
    useLoadInterstitialAds();

    return <Slot />;
}
