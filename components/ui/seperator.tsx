import { COLORS } from "@/constants";
import { ReactNode } from "react";
import { View } from "react-native";
import { RNText } from "./text";

type Props = {
    children: string;
    color: string;
};

export function Seperator({ children, color }: Props) {
    return (
        <View
            style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 12,
            }}
        >
            <View
                style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: color,
                }}
            />
            <View
                style={{
                    marginHorizontal: 8,
                }}
            >
                <RNText style={{ color: color }}>{children}</RNText>
            </View>
            <View
                style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: color,
                }}
            />
        </View>
    );
}
