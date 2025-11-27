import { COLORS } from "@/constants";
import { View } from "react-native";
import { RNText } from "./text";

type IconWrapperProps = {
    children: React.ReactNode;
    title?: string;
};

export function IconWrapper({ children, title }: IconWrapperProps) {
    return (
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
                gap: 4,
            }}
        >
            <View
                style={{
                    width: 52,
                    height: 52,
                    borderRadius: 18,
                    backgroundColor: COLORS.orangeLight + "43",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {children}
            </View>
            <RNText
                style={{
                    color: COLORS.primary,
                    fontWeight: "600",
                    textAlign: "center",
                }}
            >
                {title}
            </RNText>
        </View>
    );
}
