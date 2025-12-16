import { useLoadInterstitialAds } from "@/hooks/intersitialAd";
import { useAuthStore } from "@/store/auth";
import { Redirect, Stack } from "expo-router";

export default function RootLayout() {
    useLoadInterstitialAds();
    const { isLoggedIn } = useAuthStore();

    if (!isLoggedIn) {
        return <Redirect href="/public/auth/login" />;
    }

    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        />
    );
}
