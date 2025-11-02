import { COLORS } from "@/constants";
import { ReactNode } from "react";
import { ScrollView, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import {
    SafeAreaView,
    SafeAreaViewProps,
    useSafeAreaInsets,
} from "react-native-safe-area-context";

type Props = {
    children?: ReactNode;
} & SafeAreaViewProps;

export function Layout({ children, style, ...props }: Props) {
    const { top, bottom, left, right } = useSafeAreaInsets();

    const padding = 12;

    return (
        <SafeAreaView
            edges={props.edges || []}
            style={[style, { flex: 1 }]}
            {...props}
        >
            <KeyboardAwareScrollView
                contentContainerStyle={{
                    backgroundColor: COLORS.background,
                    flex: 1,
                    gap: 8,
                    padding,
                }}
            >
                {children}
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}
