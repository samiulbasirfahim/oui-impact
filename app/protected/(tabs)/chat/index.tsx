import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TextInput,
    View,
} from "react-native";

import { COLORS } from "@/constants";
import { useKeyboardOffset } from "@/hooks/useKeyboardOffset";
import { useKeyboardVisibility } from "@/hooks/useKeyboardVisibility";

import { RNBannerAd } from "@/components/common/banner-ad";
import { ChatInput } from "@/components/common/chat-input";
import { RNButton } from "@/components/ui/button";
import { ChatTemplateButton } from "@/components/ui/chat-template-button";
import { RNText } from "@/components/ui/text";
import { useTranslation } from "react-i18next";

const createChatId = () => `chat-${Date.now()}`;

export default function NewChatScreen() {
    const { t } = useTranslation();
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
                                    <RNText>{t("home.header.points")}</RNText>
                                    <RNText size="2xl" variant="title">
                                        1,250
                                    </RNText>
                                </View>

                                <View
                                    style={{ flexDirection: "row", gap: 6, alignItems: "center" }}
                                >
                                    <RNButton
                                        style={{ backgroundColor: COLORS.orange }}
                                        size="sm"
                                        onPress={() => {
                                            router.push("/protected/(tabs)/reward");
                                        }}
                                    >
                                        {t("rewards.home.redeemNow")}
                                    </RNButton>
                                    <RNButton
                                        size="sm"
                                        onPress={() => {
                                            router.push("/protected/others/subscription");
                                        }}
                                    >
                                        {t("rewards.home.upgrade")}
                                    </RNButton>
                                </View>
                            </View>
                        )}

                        <View style={{ alignItems: "center", gap: 6 }}>
                            <RNText size="xl" variant="title">
                                {t("home.header.welcomeLong")}
                            </RNText>

                            <RNText
                                size="sm"
                                style={{ color: COLORS.muted, textAlign: "center" }}
                            >
                                {t("chat.home.helperSubtitle")}
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
                                    title={t("chat.templates.writing.title")}
                                    description={t("chat.templates.writing.description")}
                                    onPress={() => {
                                        inputRef.current?.focus();
                                        setInputText("Help me write a professional email about ");
                                    }}
                                />

                                <ChatTemplateButton
                                    title={t("chat.templates.creative.title")}
                                    description={t("chat.templates.creative.description")}
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
                <RNBannerAd />
            </KeyboardAvoidingView>
        </View>
    );
}
