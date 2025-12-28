import { View } from "react-native";
import { RNText } from "@/components/ui/text";
import { COLORS } from "@/constants";
import { Message } from "@/type/message";
import { formatTimeAMPM } from "@/lib/utils";

export const MessageBubble = ({ message }: { message: Message }) => {
    const isMe = message.isMe;

    return (
        <View style={{ alignItems: isMe ? "flex-end" : "flex-start" }}>
            <RNText
                style={{
                    backgroundColor: isMe ? COLORS.primary : COLORS.muted + "33",
                    color: isMe ? "#fff" : undefined,
                    paddingVertical: 8,
                    paddingHorizontal: 15,
                    maxWidth: "80%",
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    borderBottomRightRadius: isMe ? 0 : 15,
                    borderBottomLeftRadius: isMe ? 15 : 0,
                }}
            >
                {message.text}
            </RNText>

            <RNText size="xs" style={{ marginTop: 2 }}>
                {formatTimeAMPM(message.time)}
            </RNText>
        </View>
    );
};
