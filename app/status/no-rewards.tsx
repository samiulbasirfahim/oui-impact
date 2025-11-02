import { RNButton } from "@/components/ui/button";
import { RNText } from "@/components/ui/text";
import RewardExpired from "@/assets/svgs/reward.svg";
import { BlurBG } from "@/components/ui/blur-bg";

export default function NoChatScreen() {
    return (
        <BlurBG
            style={{
                padding: 16,
                gap: 8,
            }}
            centered
        >
            <RewardExpired height={100} />
            <RNText size="xl" variant="title">
                No Rewards Yet
            </RNText>
            <RNText
                size="md"
                variant="secondary"
                style={{ textAlign: "center", marginBottom: 12 }}
            >
                Earn rewards by completing actions.
            </RNText>
            <RNButton>Earn Now</RNButton>
        </BlurBG>
    );
}
