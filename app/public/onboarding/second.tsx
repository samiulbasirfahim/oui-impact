import Illustration from "@/assets/images/onboarding-2.png";
import { OnboardingScreen } from "@/components/common/onboarding-screen";
import { router } from "expo-router";

export default function SecondOnboardingScreen() {
    return (
        <OnboardingScreen
            imageSource={Illustration}
            title="Welcome"
            subtitle="Earn Rewards Effortlessly"
            description="Use AI assistant daily"
            caption="Every action earns OUI Points and supports good causes."
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
