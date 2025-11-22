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
import { useRouter } from "expo-router";
import { COLORS } from "@/constants";
import { RNText } from "@/components/ui/text";
import { RNButton } from "@/components/ui/button";
import { ChatTemplateButton } from "@/components/ui/chat-template-button";

const generateChatId = () => `chat-${Date.now()}`;

export default function NewChatScreen() {
    const router = useRouter();
    const keyboardOffset = useKeyboardOffset();
    const [inputText, setInputText] = useState("");
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const scrollViewRef = useRef<ScrollView>(null);
    const inputFieldRef = useRef<TextInput>(null);

    useEffect(() => {
        const showEvent =
            Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
        const hideEvent =
            Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

        const showListener = Keyboard.addListener(showEvent, () => {
            setIsKeyboardVisible(true);
        });

        const hideListener = Keyboard.addListener(hideEvent, () => {
            setIsKeyboardVisible(false);
        });

        return () => {
            showListener.remove();
            hideListener.remove();
        };
    }, []);

    const handleSend = () => {
        if (!inputText.trim()) return;

        const newChatId = generateChatId();

        router.replace({
            pathname: `/protected/(tabs)/chat/[id]`,
            params: {
                id: newChatId,
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
                <ScrollView
                    ref={scrollViewRef}
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
                    keyboardDismissMode="interactive"
                    keyboardShouldPersistTaps="never"
                >
                    <View
                        style={{
                            flex: 1,
                            justifyContent: isKeyboardVisible ? "center" : "space-between",
                            padding: 20,
                            paddingBottom: 10,
                        }}
                    >
                        {!isKeyboardVisible && (
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    backgroundColor: COLORS.orange + "33",
                                    padding: 8,
                                    paddingVertical: 16,
                                    borderRadius: 8,
                                }}
                            >
                                <View>
                                    <RNText
                                        style={{
                                            fontWeight: "400",
                                        }}
                                    >
                                        Your Points
                                    </RNText>
                                    <RNText size="2xl" variant="title">
                                        1,250
                                    </RNText>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        gap: 4,
                                        alignItems: "center",
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <RNButton
                                        style={{
                                            backgroundColor: COLORS.orange,
                                        }}
                                        size="sm"
                                    >
                                        Reedem
                                    </RNButton>
                                    <RNButton size="sm">Premium</RNButton>
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
                                I'm here to help you with questions, creative tasks, and
                                conversations. How can I assist you today?
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
                                    description="Craft emails, blog posts. product descriptions. and more"
                                    onPress={() => {
                                        inputFieldRef.current?.focus();
                                        setInputText("Help me write a professional email about ");
                                    }}
                                />

                                <ChatTemplateButton
                                    title="Creative"
                                    description="Brainstorm ideas, write stones, poems. or captions"
                                    onPress={() => {
                                        inputFieldRef.current?.focus();
                                        setInputText("Can you help me brainstorm some ideas for ");
                                    }}
                                />
                            </View>
                        )}
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
                        ref={inputFieldRef}
                        placeholder="Type Your Message"
                        value={inputText}
                        onChangeText={setInputText}
                        onSubmitEditing={handleSend}
                        maxLength={undefined}
                        returnKeyType="send"
                    />
                    <Pressable onPress={handleSend} style={{ marginRight: 10 }}>
                        <FontAwesome
                            name="telegram"
                            size={30}
                            color={inputText.trim() ? COLORS.primary : COLORS.primary + "66"}
                        />
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}
