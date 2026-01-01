import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    ActivityIndicator,
    Text,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { Stack, useLocalSearchParams } from "expo-router";

import { COLORS } from "@/constants";
import { Message } from "@/type/message";
import { useKeyboardOffset } from "@/hooks/useKeyboardOffset";
import { MessageBubble } from "@/components/common/chat-bubble";
import { ChatInput } from "@/components/common/chat-input";
import { RNBannerAd } from "@/components/common/banner-ad";
import { useMessageHistory, useSendMessage } from "@/queries/useChat";

export default function ChatScreen() {
    const { id } = useLocalSearchParams<{ id?: string }>();
    const chatId = id ? parseInt(id, 10) : 0;

    const keyboardOffset = useKeyboardOffset();
    const scrollRef = useRef<ScrollView>(null);

    const {
        data: messageHistory = [],
        isLoading,
        isError,
    } = useMessageHistory(chatId);
    const { mutate: sendMessage, isPending: isSendingMessage } = useSendMessage();

    const [inputText, setInputText] = useState("");

    const scrollToBottom = () => {
        scrollRef.current?.scrollToEnd({ animated: true });
    };

    const [tmpMessages, setTmpMessages] = useState<Message[]>([]);

    useEffect(() => {
        if (messageHistory.length !== tmpMessages.length) {
            scrollToBottom();
            setTmpMessages(messageHistory);
        }
    }, [messageHistory, chatId]);

    useEffect(() => {
        const event =
            Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";

        const sub = Keyboard.addListener(event, () =>
            setTimeout(scrollToBottom, 100),
        );

        return () => sub.remove();
    }, []);

    const handleSend = () => {
        if (!inputText.trim()) return;

        setTmpMessages((prev) => [
            ...prev,
            {
                id: `temp-${Date.now()}`,
                text: inputText.trim(),
                time: new Date().toISOString(),
                isMe: true,
            },
        ]);

        sendMessage(
            { chatId, text: inputText.trim() },
            {
                onSuccess: (data) => {
                    if (!data) return;

                    if (data === null) return;
                    if (typeof data !== "object") return;
                    if (!("assistant_text" in data)) return;
                    if (!("created_at" in data)) return;
                    if (!("id" in data)) return;

                    if (data.assistant_text) {
                        setTmpMessages(
                            (prev) =>
                                [
                                    ...prev,
                                    {
                                        id: data.id,
                                        text: data.assistant_text || "",
                                        time: data.created_at,
                                        isMe: false,
                                    },
                                ] as any,
                        );
                    }
                },
            },
        );

        setInputText("");
    };

    useEffect(() => {
        if (!messageHistory?.length) return;

        requestAnimationFrame(() => {
            scrollRef.current?.scrollToEnd({ animated: true });
        });
    }, [messageHistory, tmpMessages]);

    return (
        <>
            <Stack.Screen options={{ title: "AI Assistant" }} />

            <View style={{ flex: 1, backgroundColor: COLORS.background }}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={keyboardOffset}
                >
                    <ScrollView
                        ref={scrollRef}
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
                        onContentSizeChange={scrollToBottom}
                    >
                        <View style={{ flex: 1, padding: 20, gap: 8 }}>
                            {isLoading && (
                                <ActivityIndicator size="large" color={COLORS.primary} />
                            )}

                            {isError && (
                                <Text style={{ color: "red" }}>Failed to load messages</Text>
                            )}

                            {!isLoading && (
                                <>
                                    {tmpMessages.map((msg: Message) => (
                                        <MessageBubble key={msg.id} message={msg} />
                                    ))}

                                    {isSendingMessage && (
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
                            )}
                        </View>
                    </ScrollView>

                    <ChatInput
                        value={inputText}
                        onChange={setInputText}
                        onSend={handleSend}
                    />

                    <RNBannerAd />
                </KeyboardAvoidingView>
            </View>
        </>
    );
}
