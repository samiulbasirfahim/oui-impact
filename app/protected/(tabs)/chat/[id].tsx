import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { Stack, useLocalSearchParams } from "expo-router";

import { COLORS } from "@/constants";
import { Message } from "@/type/message";
import { useKeyboardOffset } from "@/hooks/useKeyboardOffset";
import { MessageBubble } from "@/components/common/chat-bubble";
import { ChatInput } from "@/components/common/chat-input";

const formatTime = (d: Date): string =>
    d.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });

export default function ChatScreen() {
    const { id, initialMessage } = useLocalSearchParams<{
        id?: string;
        initialMessage?: string;
    }>();
    const keyboardOffset = useKeyboardOffset();

    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState("");

    const scrollRef = useRef<ScrollView>(null);
    const initialized = useRef(false);

    const scrollToBottom = () => {
        scrollRef.current?.scrollToEnd({ animated: true });
    };

    useEffect(() => {
        if (!initialMessage || initialized.current) return;
        initialized.current = true;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: initialMessage,
            time: formatTime(new Date()),
            isMe: true,
        };

        setMessages([userMsg]);

        setTimeout(() => {
            const reply: Message = {
                id: (Date.now() + 1).toString(),
                text: "Thanks for your message! How can I assist you today?",
                time: formatTime(new Date()),
                isMe: false,
            };
            setMessages((prev) => [...prev, reply]);
        }, 1000);
    }, [initialMessage]);

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

        const msg: Message = {
            id: Date.now().toString(),
            text: inputText.trim(),
            time: formatTime(new Date()),
            isMe: true,
        };

        setMessages((p) => [...p, msg]);
        setInputText("");

        setTimeout(() => {
            const reply: Message = {
                id: (Date.now() + 1).toString(),
                text: "Thanks! I'll get back to you shortly.",
                time: formatTime(new Date()),
                isMe: false,
            };
            setMessages((prev) => [...prev, reply]);
        }, 1000);
    };

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
                        onLayout={scrollToBottom}
                    >
                        <View style={{ flex: 1, padding: 20, gap: 8 }}>
                            {messages.map((msg) => (
                                <MessageBubble key={msg.id} message={msg} />
                            ))}
                        </View>
                    </ScrollView>

                    <ChatInput
                        value={inputText}
                        onChange={setInputText}
                        onSend={handleSend}
                    />
                </KeyboardAvoidingView>
            </View>
        </>
    );
}
