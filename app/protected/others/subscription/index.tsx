import { LinearGradient } from "expo-linear-gradient";
import { RNText } from "@/components/ui/text";
import { Layout } from "@/components/ui/layout";
import { View } from "react-native";
import { COLORS } from "@/constants";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Stack } from "expo-router";
import { PlanFeatures } from "@/components/common/subscription";

export default function Screen() {
    return (
        <>
            <Stack.Screen options={{ headerTitle: "Subscriptions" }} />
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
                        Unlock Premium Features
                    </RNText>
                    <RNText
                        style={{
                            marginTop: 8,
                            textAlign: "center",
                            color: COLORS.secondaryText,
                        }}
                    >
                        Get more points, unlock advanced features, and enjoy and enhanced
                        expirience
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
                                Current Plan
                            </RNText>
                            <RNText variant="title" style={{ marginTop: 2 }} size="xl">
                                Free Version
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
                                Points Available
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
                                1,200
                            </RNText>
                        </View>
                    </View>

                    <PlanFeatures
                        title="Free Plan"
                        description="Basic Features"
                        price="$0"
                        billingCycle="forever"
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
                        isCurrentPlan={true}
                    />

                    <PlanFeatures
                        title="Premium Plan"
                        description="All features unlocked"
                        price="$9.99"
                        billingCycle="per month"
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
                    />
                    <PlanFeatures
                        title="Pro Plan"
                        description="For Power Users"
                        price="$19.99"
                        billingCycle="per month"
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
                    />
                </View>
            </Layout>
        </>
    );
}
