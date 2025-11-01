import { RNButton } from "@/components/ui/button";
import { RNText } from "@/components/ui/text";
import SessionExpired from "@/assets/svgs/session-expired.svg";
import { BlurBG } from "@/components/ui/blur-bg";

export default function NotInternetScreen() {
    return (
        <BlurBG
            style={{
                padding: 16,
                gap: 8,
            }}
            centered
        >
            <SessionExpired height={100} />
            <RNText size="xl" variant="title">
                Session Expired
            </RNText>
            <RNText
                size="md"
                variant="secondary"
                style={{ textAlign: "center", marginBottom: 12 }}
            >
                Your session has expired. Please log in again to continue.
            </RNText>
            <RNButton>Login Again</RNButton>
        </BlurBG>
    );
}
