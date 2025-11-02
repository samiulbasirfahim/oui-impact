import { RNButton } from "@/components/ui/button";
import { RNText } from "@/components/ui/text";
import NoChat from "@/assets/svgs/chat.svg";
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
            <NoChat height={100} />
            <RNText size="xl" variant="title">
                No Chats Yet
            </RNText>
            <RNText
                size="md"
                variant="secondary"
                style={{ textAlign: "center", marginBottom: 12 }}
            >
                Start a new conversation to see your chats here.
            </RNText>
            <RNButton>Start Chat</RNButton>
        </BlurBG>
    );
}
