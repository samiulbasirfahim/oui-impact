import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Illustration from "@/assets/images/logo.png";
import { OnboardingScreen } from "@/components/common/onboarding-screen";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import { View } from "react-native";
import { COLORS } from "@/constants";
import { IconWrapper } from "@/components/ui/icon-wrapper";
import { useTranslation } from "react-i18next";

export default function FourthOnboardingScreen() {
    const { t } = useTranslation();
    return (
        <OnboardingScreen
            imageSource={Illustration}
            title={t("onboarding.screen4.title")}
            subtitle={t("onboarding.screen4.subtitle")}
            skipAction={() => {
                router.push("/public/auth");
            }}
            nextAction={() => {
                router.push("/public/auth");
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 24,
                    justifyContent: "center",
                }}
            >
                <IconWrapper title={t("onboarding.screen4.cta1")}>
                    <MaterialCommunityIcons
                        name="account-cog"
                        size={29}
                        color={COLORS.primary}
                    />
                </IconWrapper>
                <IconWrapper title={t("onboarding.screen4.cta2")}>
                    <FontAwesome5 name="coins" size={29} color={COLORS.orangeLight} />
                </IconWrapper>
                <IconWrapper title={t("onboarding.screen4.cta3")}>
                    <FontAwesome5 name="trophy" size={29} color={COLORS.orange} />
                </IconWrapper>
            </View>
        </OnboardingScreen>
    );
}
