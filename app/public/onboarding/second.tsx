import Illustration from "@/assets/images/onboarding-2.png";
import { OnboardingScreen } from "@/components/common/onboarding-screen";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

export default function SecondOnboardingScreen() {
    const { t } = useTranslation();

    return (
        <OnboardingScreen
            imageSource={Illustration}
            title={t("onboarding.screen2.title")}
            subtitle={t("onboarding.screen2.subtitle")}
            tatalSteps={3}
            currentStep={2}
            skipAction={() => {
                router.push("/public/auth");
            }}
            nextAction={() => {
                router.push("/public/onboarding/third");
            }}
        />
    );
}
