import { TextInput, TextInputProps, View } from "react-native";
import { RNText } from "./text";
import { COLORS } from "@/constants";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

type Props = {
    label?: string;
    style?: ViewProps["style"];
} & TextInputProps;

export function RNInput({ style, label, placeholder, ...props }: Props) {
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
            />
        </View>
    );
}
