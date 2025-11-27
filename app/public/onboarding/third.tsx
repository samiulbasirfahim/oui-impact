import Illustration from "@/assets/images/onboarding-3.png";
import { OnboardingScreen } from "@/components/common/onboarding-screen";
import { router } from "expo-router";

export default function ThirdOnboardingScreen() {
    return (
        <OnboardingScreen
            imageSource={Illustration}
            title="Welcome to Oui Impact"
            subtitle="Small Actions, Big Impact"
            description="Your engagement helps fund social and environmental projects."
            caption="Together,We're building a better future."
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
