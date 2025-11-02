import { COLORS } from "@/constants";
import { ReactNode } from "react";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import {
    KeyboardAwareScrollView,
    KeyboardAwareScrollViewProps,
} from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
    children?: ReactNode;
    edges?: ("top" | "bottom" | "left" | "right")[];
} & KeyboardAwareScrollViewProps &
    ViewProps;

export function KeyboardAwareScrollableLayout({
    children,
    style,
    edges,
    ...props
}: Props) {
    const { top, bottom, left, right } = useSafeAreaInsets();
    const padding = 12;

    const paddingStyle = {
        paddingTop: (edges?.includes("top") ? top : 0) + padding,
        paddingBottom: (edges?.includes("bottom") ? bottom : 0) + padding,
        paddingLeft: (edges?.includes("left") ? left : 0) + padding,
        paddingRight: (edges?.includes("right") ? right : 0) + padding,
    };

    return (
        <KeyboardAwareScrollView
            {...props}
            contentContainerStyle={[
                style,
                {
                    backgroundColor: COLORS.background,
                    ...paddingStyle,
                },
            ]}
            keyboardShouldPersistTaps="handled"
            enableAutomaticScroll
            showsVerticalScrollIndicator={false}
        >
            {children}
        </KeyboardAwareScrollView>
    );
}
