import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Entypo from "@expo/vector-icons/Entypo";
import { COLORS } from "@/constants";

export function TreeGoalProgress({ percent = 10 }) {
    const size = 128;
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = (percent / 100) * circumference;

    return (
        <View style={styles.container}>
            <Svg width={size} height={size}>
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={COLORS.muted + "40"}
                    strokeWidth={strokeWidth}
                    fill="none"
                />

                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={COLORS.primary}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress}
                    fill="none"
                    rotation="-90"
                    origin={`${size / 2}, ${size / 2}`}
                />
            </Svg>

            <View style={styles.centerContent}>
                <Text style={styles.percentText}>{percent}%</Text>
                <Entypo name="leaf" size={24} color={COLORS.primary} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 128,
        height: 128,
        justifyContent: "center",
        alignItems: "center",
    },
    centerContent: {
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
    },
    percentText: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 4,
        color: "#222",
    },
});
