import React, { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import Animated, {
    interpolate,
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { RNText } from "./text";
import { COLORS } from "@/constants";

type Props = {
    onToggle: (toggled: boolean) => void;
    value?: boolean;
    label: string;
    subLabel?: string;
};

export function RNSwitch({ value, label, subLabel, onToggle }: Props) {
    const [enabled, setEnabled] = useState(value ?? false);
    const isOn = useSharedValue(enabled);

    const toggleSwitch = () => {
        const newValue = !enabled;
        setEnabled(newValue);
        onToggle(newValue);
        isOn.value = newValue;
    };

    const height = useSharedValue(0);
    const width = useSharedValue(0);

    const trackAnimatedStyle = useAnimatedStyle(() => {
        const color = interpolateColor(
            isOn.value,
            [0, 1],
            [COLORS.muted, COLORS.primary],
        );
        const colorValue = withTiming(color, { duration: 200 });

        return {
            backgroundColor: colorValue,
            borderRadius: height.value / 2,
        };
    });

    const thumbAnimatedStyle = useAnimatedStyle(() => {
        const moveValue = interpolate(
            Number(isOn.value),
            [0, 1],
            [0, width.value - height.value],
        );
        const translateValue = withTiming(moveValue, { duration: 200 });

        return {
            transform: [{ translateX: translateValue }],
            borderRadius: height.value / 2,
        };
    });

    return (
        <View
            style={{
                flexDirection: "row",
                paddingHorizontal: 8,
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            <View>
                {label && (
                    <RNText size="md" variant="title">
                        {label}
                    </RNText>
                )}
                {subLabel && (
                    <RNText size="sm" variant="secondary">
                        {subLabel}
                    </RNText>
                )}
            </View>

            <Pressable onPress={toggleSwitch}>
                <Animated.View
                    onLayout={(e) => {
                        height.value = e.nativeEvent.layout.height;
                        width.value = e.nativeEvent.layout.width;
                    }}
                    style={[switchStyles.track, trackAnimatedStyle]}
                >
                    <Animated.View
                        style={[switchStyles.thumb, thumbAnimatedStyle]}
                    ></Animated.View>
                </Animated.View>
            </Pressable>
        </View>
    );
}

const switchStyles = StyleSheet.create({
    track: {
        alignItems: "flex-start",
        width: 55,
        height: 30,
        padding: 1,
    },
    thumb: {
        height: "100%",
        aspectRatio: 1,
        backgroundColor: "white",
    },
});
