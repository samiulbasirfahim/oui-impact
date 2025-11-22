import RADIXDASHBOARD from "@/assets/svgs/radix-icons_dashboard.svg";
import { COLORS } from "@/constants";
import { RNButton } from "./button";
import { RNText } from "./text";
import { View } from "react-native";

export function ChatTemplateButton({
    title,
    description,
    onPress,
}: {
    title: string;
    description: string;
    onPress: () => void;
}) {
    return (
        <RNButton
            onPress={onPress}
            style={{
                width: "48%",
                backgroundColor: COLORS.primary + "22",
                borderRadius: 12,
                marginBottom: 12,
                alignItems: "flex-start",
            }}
            nowrap
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: 8,
                    marginBottom: 4,
                }}
            >
                <RADIXDASHBOARD width={18} height={18} fill={COLORS.text} />
                <RNText
                    style={{
                        fontSize: 16,
                        fontWeight: "600",
                        color: COLORS.text,
                    }}
                >
                    {title}
                </RNText>
            </View>
            <RNText
                style={{
                    fontSize: 14,
                    color: COLORS.muted,
                }}
            >
                {description}
            </RNText>
        </RNButton>
    );
}
