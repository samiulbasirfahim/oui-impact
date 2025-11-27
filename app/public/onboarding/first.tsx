import Illustration from "@/assets/images/onboarding-1.png";
import { OnboardingScreen } from "@/components/common/onboarding-screen";
import { router } from "expo-router";

export default function FirstOnboardingScreen() {
    return (
        <OnboardingScreen
            imageSource={Illustration}
            title="Welcome to OUI IMPACT"
            subtitle="Contribute to a Better World"
            description="Your AI Assistant for Rewards and Impact"
            caption="Chat, learn and make a difference every day."
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
