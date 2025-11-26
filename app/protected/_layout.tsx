import { useLoadInterstitialAds } from "@/hooks/intersitialAd";
import { Slot } from "expo-router";

export default function RootLayout() {
    useLoadInterstitialAds();

    return <Slot />;
}
