import { RNButton } from "@/components/ui/button";
import { RNText } from "@/components/ui/text";
import NoInternetSVG from "@/assets/svgs/no-internet.svg";
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
            <NoInternetSVG height={100} />
            <RNText size="xl" variant="title">
                No Internet Connection
            </RNText>
            <RNText
                size="md"
                variant="secondary"
                style={{ textAlign: "center", marginBottom: 12 }}
            >
                Please check your connection and try again.
            </RNText>
            <RNButton>TRY AGAIN</RNButton>
        </BlurBG>
    );
}
