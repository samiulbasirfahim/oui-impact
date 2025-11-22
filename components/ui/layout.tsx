import { COLORS } from "@/constants";
import { ReactNode } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import {
    SafeAreaView,
    SafeAreaViewProps,
    useSafeAreaInsets,
} from "react-native-safe-area-context";

type Props = {
    children?: ReactNode;
    stickyHeaderIndices?: number[];
    noPadding?: boolean;
} & SafeAreaViewProps;

export function Layout({ children, style, ...props }: Props) {
    const padding = props.noPadding ? 0 : 16;
    const { bottom } = useSafeAreaInsets();

    return (
        <SafeAreaView
            edges={props.edges || []}
            style={{ flex: 1, backgroundColor: COLORS.background, padding }}
            {...props}
        >
            <KeyboardAwareScrollView
                stickyHeaderIndices={props.stickyHeaderIndices}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                keyboardDismissMode="interactive"
                bottomOffset={20}
                contentContainerStyle={[
                    {
                        flexGrow: 1,
                        gap: 8,
                        paddingBottom: 40 + bottom,
                    },
                    style,
                ]}
            >
                {children}
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}
