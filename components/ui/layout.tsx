import { COLORS } from "@/constants";
import { ReactNode } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

type Props = {
    children?: ReactNode;
    edges?: ("top" | "bottom" | "left" | "right")[];
} & ViewProps;

export function Layout({ children, style, ...props }: Props) {
    const { top, bottom, left, right } = useSafeAreaInsets();

    const padding = 12;

    const paddingStyle = {
        paddingTop: top + padding,
        paddingBottom: bottom + padding,
        paddingLeft: left + padding,
        paddingRight: right + padding,
    };

    return (
        <View
            style={[
                style,
                {
                    backgroundColor: COLORS.background,
                    flex: 1,
                    ...paddingStyle,
                },
            ]}
            {...props}
        >
            {children}
        </View>
    );
}
