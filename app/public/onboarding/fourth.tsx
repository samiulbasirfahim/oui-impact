import Illustration from "@/assets/images/onboarding-4.png";
import { OnboardingScreen } from "@/components/common/onboarding-screen";
import { router } from "expo-router";

export default function FourthOnboardingScreen() {
    return (
        <OnboardingScreen
            imageSource={Illustration}
            title="Welcome to Oui Impact"
            subtitle="Ready to Begin ?"
            description="Manage your rewards, track your impact, and join a community making tech a force for good."
            skipAction={() => {
                router.push("/public/auth");
            }}
            nextAction={() => {
                router.push("/public/auth");
            }}
        />
    );
}
