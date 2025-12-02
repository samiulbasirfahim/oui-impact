import { COLORS } from "@/constants";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { StyleSheet, View } from "react-native";
import { RNButton } from "./button";
import { RNText } from "./text";

type WatchButtonProps = {
    onPress: () => void;
    points: number;
    isAvailable: boolean;
    duration: number;
    category: string;
    title: string;
};

export function WatchButton({
    points,
    isAvailable,
    duration,
    title,
    category,
    onPress,
}: WatchButtonProps) {
    return (
        <View style={watchButtonStyles.container}>
            <View
                style={{
                    backgroundColor: COLORS.secondary,
                    padding: 14,
                    borderRadius: 10,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <FontAwesome5 name="play" size={20} color={COLORS.background} />
            </View>

            <View
                style={{
                    flex: 1,
                    marginStart: 12,
                    justifyContent: "space-between",
                    gap: 12,
                }}
            >
                <View>
                    <RNText variant="title">{title}</RNText>
                    <RNText
                        size="sm"
                        style={{
                            color: COLORS.secondaryText,
                        }}
                    >
                        {duration} seconds - {category}
                    </RNText>
                </View>
                <View style={{ alignItems: "center", flexDirection: "row", gap: 12 }}>
                    <RNText
                        size="sm"
                        variant="title"
                        style={{
                            color: COLORS.secondary,
                            paddingVertical: 6,
                            paddingHorizontal: 13,
                            borderRadius: 20,
                            backgroundColor: COLORS.primary + "33",
                        }}
                    >
                        +{points} PTS
                    </RNText>

                    <RNText
                        size="sm"
                        style={{
                            color: isAvailable ? COLORS.secondaryText : COLORS.accent,
                        }}
                    >
                        {isAvailable ? "Available" : "Not Available"}
                    </RNText>
                </View>
            </View>

            <RNButton size="sm">Watch</RNButton>
        </View>
    );
}

const watchButtonStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 2,
        borderColor: COLORS.primary,
        borderRadius: 12,
        padding: 12,
        marginTop: 8,
    },
});

type ClaimButtonProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
    points: number;
    onPress: () => void;
    buttonTitle: string;
};

export function ClaimButton({
    icon,
    title,
    description,
    buttonTitle,
    onPress,
    points,
}: ClaimButtonProps) {
    return (
        <View style={claimButtonStyles.container}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12, maxWidth: "60%" }}>
                <View style={claimButtonStyles.iconContainer}>{icon}</View>
                <View>
                    <RNText variant="title">{title}</RNText>
                    <RNText
                        size="md"
                        style={{
                            color: COLORS.secondaryText,
                        }}
                    >
                        {description}
                    </RNText>
                </View>
            </View>
            <View style={{ alignItems: "flex-end", gap: 12 }}>
                <RNText
                    style={{
                        color: COLORS.secondaryText,
                        paddingVertical: 6,
                        paddingHorizontal: 14,
                        borderRadius: 20,
                        backgroundColor: COLORS.backgroundSecondary,
                    }}
                    size="xs"
                >
                    +{points} PTS
                </RNText>
                <RNButton size="sm" onPress={onPress}>
                    {buttonTitle}
                </RNButton>
            </View>
        </View>
    );
}

const claimButtonStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: COLORS.primary + "33",
        borderRadius: 12,
        padding: 12,
        marginTop: 8,
    },
    iconContainer: {
        backgroundColor: COLORS.primary + "53",
        padding: 10,
        borderRadius: 8,
    },
});
