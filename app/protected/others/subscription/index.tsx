import { PlanFeatures } from "@/components/common/subscription";
import { Layout } from "@/components/ui/layout";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constants";
import { useUpdateProfile } from "@/queries/useUpdateUser";
import { useAuthStore } from "@/store/auth";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { LinearGradient } from "expo-linear-gradient";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, View } from "react-native";
import Purchases from "react-native-purchases";

export default function Screen() {
    const { t } = useTranslation();

    const currentPlan = useAuthStore((state) => state.user?.plan || "free");

    const { user, updateUser } = useAuthStore();

    const { mutateAsync: updateProfile } = useUpdateProfile();

    const handleUpgrade = async (planId: "premium" | "pro") => {
        try {
            if (user?.email) {
                await Purchases.logIn(user?.email);
            }

            const offerings = await Purchases.getOfferings();

            if (!offerings.current) return null;

            const pkg = offerings.current.availablePackages.find((p) => {
                return p.identifier === planId;
            });

            if (pkg) {
                const { customerInfo } = await Purchases.purchasePackage(pkg);

                if (
                    planId === "premium" &&
                    customerInfo.entitlements.active["premium_access"]
                ) {
                    updateUser({
                        plan: "premium",
                    });
                    console.log("Upgraded to Premium plan");
                } else if (
                    planId === "pro" &&
                    customerInfo.entitlements.active["pro_access"]
                ) {
                    updateUser({
                        plan: "pro",
                    });
                    console.log("Upgraded to Pro plan");
                }
            }
        } catch (error) {
            console.log("Failed to upgrade plan: ", error);
        }
    };

    return (
        <>
            <Stack.Screen options={{ headerTitle: t("subscription.title") }} />
            <Layout noPadding>
                <LinearGradient
                    colors={["#ffffff", "#5A92B133", "#5A92B160", "#5A92B133", "#ffffff"]}
                    style={{
                        paddingVertical: 30,
                        alignItems: "center",
                        justifyContent: "center",
                        paddingHorizontal: 16,
                    }}
                >
                    <View
                        style={{
                            padding: 12,
                            backgroundColor: COLORS.primary,
                            borderRadius: 10,
                            marginBottom: 16,
                        }}
                    >
                        <FontAwesome5 name="crown" size={28} color={COLORS.background} />
                    </View>
                    <RNText variant="title" size="2xl" style={{ textAlign: "center" }}>
                        {t("subscription.hero.title")}
                    </RNText>
                    <RNText
                        style={{
                            marginTop: 8,
                            textAlign: "center",
                            color: COLORS.secondaryText,
                        }}
                    >
                        {t("subscription.hero.subtitle")}
                    </RNText>
                </LinearGradient>
                <View style={{ paddingHorizontal: 16 }}>
                    <View
                        style={{
                            borderLeftWidth: 4,
                            borderLeftColor: COLORS.primary,
                            backgroundColor: COLORS.primary + "1A",
                            paddingVertical: 8,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingHorizontal: 12,
                        }}
                    >
                        <View>
                            <RNText
                                size="lg"
                                style={{
                                    color: COLORS.primary,
                                    fontWeight: "500",
                                }}
                            >
                                {t("subscription.currentPlan")}
                            </RNText>
                            <RNText variant="title" style={{ marginTop: 2 }} size="xl">
                                {
                                    //t("subscription.freeVersion")
                                    currentPlan === "free"
                                        ? "Free Plan"
                                        : currentPlan === "premium"
                                            ? "Premium Plan"
                                            : "Pro Plan"
                                }
                            </RNText>
                        </View>

                        <View
                            style={{
                                alignItems: "flex-end",
                            }}
                        >
                            <RNText
                                size="sm"
                                style={{
                                    color: COLORS.secondaryText,
                                }}
                            >
                                {t("subscription.pointsAvailable")}
                            </RNText>
                            <RNText
                                variant="title"
                                size="xl"
                                style={{
                                    marginTop: 2,
                                    color: COLORS.primary,
                                    fontWeight: "600",
                                }}
                            >
                                {user?.my_points || 0}
                            </RNText>
                        </View>
                    </View>

                    <PlanFeatures
                        title={t("subscription.plans.free.title")}
                        description={t("subscription.plans.free.description")}
                        price="$0"
                        billingCycle={t("subscription.billing.forever")}
                        icon={
                            <FontAwesome5 name="gift" size={24} color={COLORS.background} />
                        }
                        features={[
                            { title: "50 Points per month", included: true },
                            { title: "Basic features access", included: true },
                            { title: "Community support", included: true },
                            { title: "Priority  support", included: false },
                            { title: "Advanced analytics", included: false },
                        ]}
                        isCurrentPlan={currentPlan === "free"}
                    />

                    <PlanFeatures
                        title={t("subscription.plans.premium.title")}
                        description={t("subscription.plans.premium.description")}
                        price="$9.99"
                        billingCycle={t("subscription.billing.perMonth")}
                        icon={
                            <FontAwesome5 name="star" size={24} color={COLORS.background} />
                        }
                        features={[
                            { title: "500 Points per month", included: true },
                            { title: "All Premium features", included: true },
                            { title: "Priority  support", included: true },
                            { title: "Advanced analytics", included: true },
                            { title: "Export capabilities", included: true },
                        ]}
                        isPopular={true}
                        isCurrentPlan={currentPlan === "premium"}
                        onPurchaseButtonPress={() => handleUpgrade("premium")}
                    />
                    <PlanFeatures
                        title={t("subscription.plans.pro.title")}
                        description={t("subscription.plans.pro.description")}
                        price="$19.99"
                        billingCycle={t("subscription.billing.perMonth")}
                        isCurrentPlan={currentPlan === "pro"}
                        icon={
                            <FontAwesome5 name="rocket" size={24} color={COLORS.background} />
                        }
                        features={[
                            { title: "Unlimited points", included: true },
                            { title: "All premium features", included: true },
                            { title: "24/7 priority support", included: true },
                            { title: "Team collaboration", included: true },
                            { title: "API Access", included: true },
                        ]}
                        onPurchaseButtonPress={() => handleUpgrade("pro")}
                    />
                </View>
            </Layout>
        </>
    );
}
