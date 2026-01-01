import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
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
import { useMessageHistory, useSendFirstMessage } from "@/queries/useChat";
import { MessageBubble } from "@/components/common/chat-bubble";
import { Message } from "@/type/message";

export default function NewChatScreen() {
    const { t } = useTranslation();
    const router = useRouter();
    const keyboardOffset = useKeyboardOffset();
    const isKeyboardVisible = useKeyboardVisibility();

    const [inputText, setInputText] = useState("");
    const inputRef = useRef<TextInput>(null);

    const { mutate: sendFirstMessage, isPending } = useSendFirstMessage();

    const [tmpMessages, setTmpMessages] = useState<Message[]>([]);
    const [chatId, setChatId] = useState<number | null>(null);
    const { data: messageHistory } = useMessageHistory(chatId);

    const handleSend = () => {
        setInputText(inputText.trim());
        if (!inputText.trim()) return;
        setTmpMessages([
            {
                id: "tmp-1",
                text: inputText.trim(),
                isMe: true,
                time: new Date().toISOString(),
            },
        ]);

        sendFirstMessage(
            { text: inputText.trim() },
            {
                onSuccess: (data) => {
                    if (!data || !(data as any).chat) {
                        return;
                    }

                    setInputText("");

                    setChatId((data as any).chat);
                    setTmpMessages((prev) => {
                        return [
                            ...prev,
                            {
                                id: "tmp-2",
                                text: (data as any).assistant_text,
                                isMe: false,
                                time: new Date().toISOString(),
                            },
                        ];
                    });
                },
            },
        );

        setInputText("");
    };

    useEffect(() => {
        if (messageHistory && messageHistory.length > 0) {
            router.replace(`/protected/chat/${chatId}`);

            setTimeout(() => {
                setTmpMessages([]);
                setChatId(null);
            }, 200);
        }
    }, [messageHistory]);

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.background }}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={keyboardOffset}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
                    {tmpMessages.length > 0 ? (
                        <>
                            {tmpMessages.map((message) => (
                                <MessageBubble message={message} key={message.id} />
                            ))}

                            {isPending && (
                                <View
                                    style={{
                                        alignSelf: "flex-start",
                                        backgroundColor: COLORS.muted + "22",
                                        padding: 10,
                                        borderRadius: 16,
                                        maxWidth: "80%",
                                    }}
                                >
                                    <Text style={{ color: COLORS.muted }}>Typing...</Text>
                                </View>
                            )}
                        </>
                    ) : (
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
                                        style={{
                                            flexDirection: "row",
                                            gap: 6,
                                            alignItems: "center",
                                        }}
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
                                            setInputText("Help me write a professional email about ");
                                            inputRef.current?.focus();
                                        }}
                                    />

                                    <ChatTemplateButton
                                        title={t("chat.templates.creative.title")}
                                        description={t("chat.templates.creative.description")}
                                        onPress={() => {
                                            setInputText(
                                                "Can you help me brainstorm some ideas for ",
                                            );
                                            inputRef.current?.focus();
                                        }}
                                    />
                                </View>
                            )}
                        </View>
                    )}
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
