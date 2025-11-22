import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TextInput,
} from "react-native";
import { useState, useRef } from "react";
import { useRouter } from "expo-router";

import { COLORS } from "@/constants";
import { useKeyboardOffset } from "@/hooks/useKeyboardOffset";
import { useKeyboardVisibility } from "@/hooks/useKeyboardVisibility";

import { RNText } from "@/components/ui/text";
import { RNButton } from "@/components/ui/button";
import { ChatTemplateButton } from "@/components/ui/chat-template-button";
import { ChatInput } from "@/components/common/chat-input";

const createChatId = () => `chat-${Date.now()}`;

export default function NewChatScreen() {
    const router = useRouter();
    const keyboardOffset = useKeyboardOffset();
    const isKeyboardVisible = useKeyboardVisibility();

    const [inputText, setInputText] = useState("");
    const inputRef = useRef<TextInput>(null);

    const handleSend = () => {
        if (!inputText.trim()) return;

        router.replace({
            pathname: "/protected/(tabs)/chat/[id]",
            params: {
                id: createChatId(),
                initialMessage: inputText.trim(),
            },
        });
    };

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.background }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={keyboardOffset}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: isKeyboardVisible ? "center" : "space-between",
                        }}
                    >
                        {!isKeyboardVisible && (
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    backgroundColor: COLORS.orange + "33",
                                    padding: 8,
                                    paddingVertical: 12,
                                    borderRadius: 8,
                                }}
                            >
                                <View>
                                    <RNText>Your Points</RNText>
                                    <RNText size="2xl" variant="title">
                                        1,250
                                    </RNText>
                                </View>

                                <View
                                    style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
                                >
                                    <RNButton
                                        style={{ backgroundColor: COLORS.orange }}
                                        size="sm"
                                        onPress={() => {
                                            router.push("/protected/(tabs)/reward");
                                        }}
                                    >
                                        Reedem
                                    </RNButton>
                                    <RNButton
                                        size="sm"
                                        onPress={() => {
                                            router.push("/protected/others/subscription");
                                        }}
                                    >
                                        Premium
                                    </RNButton>
                                </View>
                            </View>
                        )}

                        <View style={{ alignItems: "center", gap: 6 }}>
                            <RNText size="xl" variant="title">
                                Welcome to Rewardly
                            </RNText>

                            <RNText
                                size="sm"
                                style={{ color: COLORS.muted, textAlign: "center" }}
                            >
                                I'm here to help you with questions, creative tasks, and more.
                            </RNText>
                        </View>

                        {!isKeyboardVisible && (
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                }}
                            >
                                <ChatTemplateButton
                                    title="Writing"
                                    description="Emails, blog posts, descriptions, and more."
                                    onPress={() => {
                                        inputRef.current?.focus();
                                        setInputText("Help me write a professional email about ");
                                    }}
                                />

                                <ChatTemplateButton
                                    title="Creative"
                                    description="Stories, ideas, poems, captions, and more."
                                    onPress={() => {
                                        inputRef.current?.focus();
                                        setInputText("Can you help me brainstorm some ideas for ");
                                    }}
                                />
                            </View>
                        )}
                    </View>
                </ScrollView>

                <ChatInput
                    value={inputText}
                    onChange={setInputText}
                    onSend={handleSend}
                    inputRef={inputRef}
                />
            </KeyboardAvoidingView>
        </View>
    );
}
