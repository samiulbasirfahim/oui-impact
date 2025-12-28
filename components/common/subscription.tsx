import { COLORS } from "@/constants";
import { Feature } from "@/type/plan-features";
import Entypo from "@expo/vector-icons/Entypo";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { RNButton } from "../ui/button";
import { GradientBG } from "../ui/gradient-bg";
import { RNText } from "../ui/text";

type PlanFeaturesProps = {
    title: string;
    description: string;
    price: string;
    billingCycle: string;
    features: Feature[];
    icon: React.ReactNode;
    isPopular?: boolean;
    isCurrentPlan?: boolean;
    onPurchaseButtonPress?: () => void;
};

export function PlanFeatures({
    title,
    description,
    price,
    billingCycle,
    features,
    icon,
    isPopular = false,
    isCurrentPlan = false,
    onPurchaseButtonPress,
}: PlanFeaturesProps) {
    const Wrapper = isPopular ? GradientBG : View;
    const { t } = useTranslation();

    return (
        <Wrapper
            style={{
                padding: 16,
                paddingVertical: 32,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: COLORS.muted + "33",
                marginTop: 20,
                backgroundColor: COLORS.backgroundSecondary + "11",
                overflow: "hidden",
            }}
        >
            {isPopular && (
                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        backgroundColor: COLORS.orange,
                        paddingVertical: 4,
                        paddingHorizontal: 10,
                        borderBottomLeftRadius: 8,
                    }}
                >
                    <RNText
                        style={{
                            color: COLORS.background,
                            fontWeight: "bold",
                        }}
                        size="sm"
                    >
                        {t("subscription.popular")}
                    </RNText>
                </View>
            )}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 8,
                    }}
                >
                    <GradientBG
                        style={{
                            padding: 8,
                            borderRadius: 6,
                        }}
                    >
                        {icon}
                    </GradientBG>
                    <View
                        style={{
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <RNText
                            variant="title"
                            size="xl"
                            style={{
                                color: isPopular ? COLORS.background : COLORS.text,
                            }}
                        >
                            {title}
                        </RNText>
                        <RNText
                            style={{
                                color: isPopular
                                    ? COLORS.backgroundSecondary
                                    : COLORS.secondaryText,
                            }}
                        >
                            {description}
                        </RNText>
                    </View>
                </View>
                <View
                    style={{
                        alignItems: "flex-end",
                    }}
                >
                    <RNText
                        variant="title"
                        size="xl"
                        style={{
                            color: isPopular ? COLORS.background : COLORS.text,
                        }}
                    >
                        {price}
                    </RNText>
                    <RNText
                        style={{
                            color: isPopular
                                ? COLORS.backgroundSecondary
                                : COLORS.secondaryText,
                        }}
                    >
                        {billingCycle}
                    </RNText>
                </View>
            </View>

            <View style={{ marginTop: 18 }}>
                {features.map((feature, index) => (
                    <View
                        key={index}
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginTop: index === 0 ? 0 : 8,
                            opacity: feature.included ? 1 : 0.4,
                        }}
                    >
                        <Entypo
                            name={feature.included ? "check" : "cross"}
                            size={21}
                            color={feature.included ? COLORS.primary : COLORS.accent}
                        />
                        <RNText
                            style={{
                                marginLeft: 8,
                                color: isPopular ? COLORS.background : COLORS.text,
                            }}
                        >
                            {feature.title}
                        </RNText>
                    </View>
                ))}
            </View>

            <View style={{ marginTop: 20 }}>
                {isCurrentPlan ? (
                    <RNButton
                        style={{
                            backgroundColor: COLORS.muted + "33",
                        }}
                        nowrap
                        disabled
                    >
                        <RNText
                            style={{
                                color: COLORS.text,
                            }}
                            variant="title"
                        >
                            {t("subscription.currentPlan")}
                        </RNText>
                    </RNButton>
                ) : (
                    <RNButton
                        style={{
                            backgroundColor: isPopular ? COLORS.background : COLORS.text,
                        }}
                        onPress={onPurchaseButtonPress}
                        nowrap
                        disabled={price === "$0"}
                    >
                        <RNText
                            variant="title"
                            style={{
                                color: isPopular ? COLORS.primary : COLORS.background,
                            }}
                        >
                            {price === "$0"
                                ? "Free Plan"
                                : t("subscription.upgradeTo", { plan: title })}
                        </RNText>
                    </RNButton>
                )}
            </View>
        </Wrapper>
    );
}
