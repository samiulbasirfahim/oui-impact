import { ReactNode, useRef, useEffect } from "react";
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
} from "react-native";
import { useKeyboardOffset } from "@/hooks/useKeyboardOffset";
import { COLORS } from "@/constants";

type Props = {
    children: ReactNode;
    autoScrollOnKeyboard?: boolean;
    scrollEnabled?: boolean;
};

export const ChatContainer = ({
    children,
    autoScrollOnKeyboard = true,
    scrollEnabled = true,
}: Props) => {
    const keyboardOffset = useKeyboardOffset();
    const scrollViewRef = useRef<ScrollView>(null);

    useEffect(() => {
        if (!autoScrollOnKeyboard) return;

        const showEvent =
            Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
        const listener = Keyboard.addListener(showEvent, () => {
            setTimeout(
                () => scrollViewRef.current?.scrollToEnd({ animated: true }),
                100,
            );
        });

        return () => listener.remove();
    }, [autoScrollOnKeyboard]);

    const scrollToBottom = () => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    };

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.background }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={keyboardOffset}
            >
                <ScrollView
                    ref={scrollViewRef}
                    scrollEnabled={scrollEnabled}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
                    keyboardDismissMode="interactive"
                    keyboardShouldPersistTaps="never"
                    onContentSizeChange={scrollToBottom}
                    onLayout={scrollToBottom}
                >
                    {children}
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export const useChatScroll = () => {
    const scrollRef = useRef<ScrollView>(null);
    const scrollToBottom = () =>
        scrollRef.current?.scrollToEnd({ animated: true });
    return { scrollRef, scrollToBottom };
};
