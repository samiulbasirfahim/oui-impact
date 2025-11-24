import { View, TextInput, Pressable, Platform } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { COLORS } from "@/constants";
import { RefObject } from "react";
import { RNText } from "../ui/text";

interface Props {
    value: string;
    onChange: (v: string) => void;
    onSend: () => void;
    inputRef?: RefObject<TextInput | null>;
}

export const ChatInput = ({ value, onChange, onSend, inputRef }: Props) => (
    <>
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
                ref={inputRef}
                style={{
                    flex: 1,
                    paddingHorizontal: 12,
                    paddingVertical: 15,
                    fontSize: 16,
                    maxHeight: 150,
                    color: COLORS.text,
                }}
                placeholder="Type Your Message"
                value={value}
                onChangeText={onChange}
                onSubmitEditing={onSend}
                returnKeyType="send"
                placeholderTextColor={COLORS.muted}
            />

            <Pressable onPress={onSend} style={{ marginRight: 10 }}>
                <FontAwesome
                    name="telegram"
                    size={30}
                    color={value.trim() ? COLORS.primary : COLORS.primary + "66"}
                />
            </Pressable>
        </View>
    </>
);
