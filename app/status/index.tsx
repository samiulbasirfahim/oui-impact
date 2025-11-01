import { BlurBG } from "@/components/ui/blur-bg";
import { RNText } from "@/components/ui/text";
import { Link } from "expo-router";

export default function StatusScreen() {
    return (
        <BlurBG style={{ gap: 12 }} centered>
            <Link href={"/status/no-internet"}>
                <RNText variant="accent" size="md">
                    Go to No Internet Screen
                </RNText>
            </Link>

            <Link href={"/status/session-expired"}>
                <RNText variant="accent" size="md">
                    Go to No Session Expired
                </RNText>
            </Link>

            <Link href={"/status/no-chats"}>
                <RNText variant="accent" size="md">
                    Go to No Chats
                </RNText>
            </Link>

            <Link href={"/status/no-rewards"}>
                <RNText variant="accent" size="md">
                    Go to No Rewards
                </RNText>
            </Link>
        </BlurBG>
    );
}
