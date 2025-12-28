import { useLoadInterstitialAds } from "@/hooks/intersitialAd";
import { useAuthStore } from "@/store/auth";
import { Redirect, Stack } from "expo-router";
import { useEffect } from "react";
import Purchases from "react-native-purchases";

export default function RootLayout() {
    useLoadInterstitialAds();
    const { isLoggedIn } = useAuthStore();

    const { user, updateUser } = useAuthStore();

    useEffect(() => {
        const fetchCustomerInfo = async () => {
            try {
                if (user?.email) {
                    await Purchases.logIn(user?.email);
                }

                const customerInfo = await Purchases.getCustomerInfo();

                if (customerInfo.entitlements.active["pro_access"]) {
                    updateUser({ plan: "pro" });
                } else if (customerInfo.entitlements.active["premium_access"]) {
                    updateUser({ plan: "premium" });
                } else {
                    updateUser({ plan: "free" });
                }
            } catch (error) {
                console.log("Error fetching customer info: ", error);
            }
        };

        fetchCustomerInfo();
    }, [user?.email]);

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
