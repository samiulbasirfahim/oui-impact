import { COLORS } from "@/constants";
import { ReactNode } from "react";
import { View } from "react-native";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

type Props = {
    children?: ReactNode;
} & ViewProps;

export function Layout({ children, style, ...props }: Props) {
    return (
        <View
            style={[
                style,
                {
                    backgroundColor: COLORS.background,
                    flex: 1,
                    padding: 12,
                },
            ]}
            {...props}
        >
            {children}
        </View>
    );
}
