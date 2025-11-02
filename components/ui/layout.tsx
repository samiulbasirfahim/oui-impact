import { COLORS } from "@/constants";
import { ReactNode } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import {
    SafeAreaView,
    SafeAreaViewProps,
} from "react-native-safe-area-context";

type Props = {
    children?: ReactNode;
} & SafeAreaViewProps;

export function Layout({ children, style, ...props }: Props) {
    const padding = 12;

    return (
        <SafeAreaView
            edges={props.edges || []}
            style={{ flex: 1, backgroundColor: COLORS.background, padding }}
            {...props}
        >
            <KeyboardAwareScrollView
                keyboardDismissMode="interactive"
                bottomOffset={20}
            >
                {children}
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}
