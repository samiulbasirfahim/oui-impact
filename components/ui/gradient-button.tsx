import { View } from "react-native";
import { GradientBG } from "./gradient-bg";
import { RNText } from "./text";
import { COLORS } from "@/constants";
import { RNButton } from "./button";

type Props = {
    title: string;
    subtitle: string;
    buttonText: string;
    onPress?: () => void;
};

export function GradientButton({
    title,
    onPress,
    buttonText,
    subtitle,
}: Props) {
    return (
        <GradientBG
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: 16,
                borderRadius: 8,
                marginTop: 8,
            }}
        >
            <View>
                <RNText variant="title" size="lg" style={{ color: COLORS.background }}>
                    {title}
                </RNText>
                <RNText
                    variant="secondary"
                    size="md"
                    style={{ color: COLORS.background + "DD", marginTop: 4 }}
                >
                    {subtitle}
                </RNText>
            </View>

            <RNButton
                style={{
                    backgroundColor: COLORS.background,
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                }}
                onPress={onPress}
                nowrap
            >
                <RNText variant="title" style={{ color: COLORS.primary }}>
                    {buttonText}
                </RNText>
            </RNButton>
        </GradientBG>
    );
}
