import Illustration from "@/assets/images/onboarding-1.png";
import { OnboardingScreen } from "@/components/common/onboarding-screen";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

export default function FirstOnboardingScreen() {
    const { t } = useTranslation();

    return (
        <OnboardingScreen
            imageSource={Illustration}
            title={t("onboarding.screen1.title")}
            subtitle={t("onboarding.screen1.subtitle")}
            tatalSteps={3}
            currentStep={1}
            skipAction={() => {
                router.push("/public/auth");
            }}
            nextAction={() => {
                router.push("/public/onboarding/second");
            }}
        />
    );
}
