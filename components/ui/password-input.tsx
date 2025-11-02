import {
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { RNText } from "./text";
import { COLORS } from "@/constants";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import { useState } from "react";

type Props = {
    label?: string;
    style?: ViewProps["style"];
} & TextInputProps;

export function RNPInput({ style, label, placeholder, ...props }: Props) {
    const [visible, setVisible] = useState(false);

    return (
        <View style={[{ marginTop: 16 }, style]}>
            <RNText
                style={{
                    position: "absolute",
                    backgroundColor: COLORS.background,
                    zIndex: 10,
                    transform: [{ translateY: -10 }, { translateX: 8 }],
                    paddingHorizontal: 8,
                    color: COLORS.secondaryText,
                }}
                size="md"
            >
                {label}
            </RNText>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={COLORS.muted}
                {...props}
                style={[
                    {
                        borderWidth: 1,
                        borderColor: COLORS.secondaryText,
                        color: COLORS.text,
                        padding: 10,
                        borderRadius: 8,
                        paddingVertical: 10,
                        fontSize: 16,
                    },
                ]}
                secureTextEntry={!visible}
            />
            <TouchableOpacity
                style={{
                    position: "absolute",
                    right: 16,
                    top: "50%",
                    transform: [{ translateY: "-50%" }],
                }}
                onPress={() => setVisible(!visible)}
                activeOpacity={0.7}
            >
                <Entypo
                    name={!visible ? "eye-with-line" : "eye"}
                    size={18}
                    color={COLORS.muted}
                />
            </TouchableOpacity>
        </View>
    );
}
