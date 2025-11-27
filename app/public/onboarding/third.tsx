import Illustration from "@/assets/images/onboarding-3.png";
import { OnboardingScreen } from "@/components/common/onboarding-screen";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

export default function ThirdOnboardingScreen() {
    const { t } = useTranslation();

    return (
        <OnboardingScreen
            imageSource={Illustration}
            title={t("onboarding.screen3.title")}
            subtitle={t("onboarding.screen3.subtitle")}
            tatalSteps={3}
            currentStep={3}
            skipAction={() => {
                router.push("/public/auth");
            }}
            nextAction={() => {
                router.push("/public/onboarding/fourth");
            }}
        />
    );
}
