import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useKeyboardOffset } from "@/hooks/useKeyboardOffset";
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TextInput,
    View,
    Pressable,
    Keyboard,
} from "react-native";
import { useState, useRef, useEffect } from "react";
import { COLORS } from "@/constants";
import { RNText } from "@/components/ui/text";
import { Stack, useLocalSearchParams } from "expo-router";

type Message = {
    id: string;
    text: string;
    time: string;
    isMe: boolean;
};

const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
};

const MessageBubble = ({ message }: { message: Message }) => (
    <View style={{ alignItems: message.isMe ? "flex-end" : "flex-start" }}>
        <RNText
            style={{
                backgroundColor: message.isMe ? COLORS.primary : COLORS.muted + "33",
                color: message.isMe ? "#fff" : undefined,
                paddingVertical: 8,
                paddingHorizontal: 15,
                maxWidth: "80%",
                borderTopLeftRadius: 15,
                borderTopRightRadius: 15,
                borderBottomRightRadius: message.isMe ? 0 : 15,
                borderBottomLeftRadius: message.isMe ? 15 : 0,
            }}
        >
            {message.text}
        </RNText>
        <RNText size="xs" style={{ marginTop: 2 }}>
            {message.time}
        </RNText>
    </View>
);

export default function ChatScreen() {
    const { id, initialMessage } = useLocalSearchParams<{
        id: string;
        initialMessage?: string;
    }>();

    const keyboardOffset = useKeyboardOffset();
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState("");
    const scrollViewRef = useRef<ScrollView>(null);
    const hasInitialized = useRef(false);

    useEffect(() => {
        if (initialMessage && !hasInitialized.current) {
            hasInitialized.current = true;

            const userMessage: Message = {
                id: Date.now().toString(),
                text: initialMessage,
                time: formatTime(new Date()),
                isMe: true,
            };

            setMessages([userMessage]);

            setTimeout(() => {
                const reply: Message = {
                    id: (Date.now() + 1).toString(),
                    text: "Thanks for your message! How can I assist you today?",
                    time: formatTime(new Date()),
                    isMe: false,
                };
                setMessages((prev) => [...prev, reply]);
            }, 1000);
        }
    }, [initialMessage]);

    useEffect(() => {
        const showEvent =
            Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
        const keyboardShowListener = Keyboard.addListener(showEvent, () => {
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 100);
        });

        return () => {
            keyboardShowListener.remove();
        };
    }, []);

    const scrollToBottom = () => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    };

    const handleSend = () => {
        if (!inputText.trim()) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            text: inputText.trim(),
            time: formatTime(new Date()),
            isMe: true,
        };

        setMessages((prev) => [...prev, newMessage]);
        setInputText("");

        // Simulate auto-reply
        setTimeout(() => {
            const reply: Message = {
                id: (Date.now() + 1).toString(),
                text: "Thanks for your message! I'll get back to you shortly.",
                time: formatTime(new Date()),
                isMe: false,
            };
            setMessages((prev) => [...prev, reply]);
        }, 1000);
    };

    return (
        <>
            <Stack.Screen
                options={{
                    title: "AI Assistant",
                }}
            />
            <View style={{ flex: 1, backgroundColor: COLORS.background }}>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    keyboardVerticalOffset={keyboardOffset}
                >
                    <ScrollView
                        ref={scrollViewRef}
                        contentContainerStyle={{
                            flexGrow: 1,
                            paddingBottom: 10,
                        }}
                        keyboardDismissMode="interactive"
                        keyboardShouldPersistTaps="never"
                        onContentSizeChange={scrollToBottom}
                        onLayout={scrollToBottom}
                    >
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "flex-end",
                                padding: 20,
                                paddingBottom: 10,
                                gap: 8,
                            }}
                        >
                            {messages.map((msg) => (
                                <MessageBubble key={msg.id} message={msg} />
                            ))}
                        </View>
                    </ScrollView>
                    <View
                        style={{
                            paddingStart: 10,
                            gap: 5,
                            borderWidth: 2,
                            marginHorizontal: 16,
                            marginBottom: Platform.OS === "ios" ? 20 : 10,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderColor: COLORS.primary + "33",
                            borderRadius: 50,
                        }}
                    >
                        <TextInput
                            style={{
                                flex: 1,
                                paddingHorizontal: 12,
                                paddingVertical: 15,
                                fontSize: 16,
                            }}
                            placeholder="Type Your Message"
                            value={inputText}
                            onChangeText={setInputText}
                            onSubmitEditing={handleSend}
                            returnKeyType="send"
                        />
                        <Pressable onPress={handleSend} style={{ marginRight: 10 }}>
                            <FontAwesome
                                name="telegram"
                                size={30}
                                color={
                                    inputText.trim() ? COLORS.primary : COLORS.primary + "66"
                                }
                            />
                        </Pressable>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </>
    );
}
