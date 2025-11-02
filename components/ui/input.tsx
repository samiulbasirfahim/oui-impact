import { useEffect, useState } from "react";
import {
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
    LayoutChangeEvent,
} from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { RNText } from "./text";
import { COLORS } from "@/constants";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";
import Entypo from "@expo/vector-icons/Entypo";

type Props = {
    label?: string;
    style?: ViewProps["style"];
} & TextInputProps;

export function RNInput({ style, label, placeholder, ...props }: Props) {
    const isFocused = useSharedValue(false);
    const [isFocusedState, setIsFocusedState] = useState(false);

    const [showPassword, setShowPassword] = useState(
        props.secureTextEntry || false,
    );

    const [value, setValue] = useState(props.value || "");
    const [inputHeight, setInputHeight] = useState(0);

    const onChangeText = (text: string) => {
        setValue(text);
        if (props.onChangeText) {
            props.onChangeText(text);
        }
    };

    const labelPosition = useSharedValue(value ? 1 : 0);

    const hasText = value && value.toString().length > 0;

    useEffect(() => {
        labelPosition.value = withTiming(isFocusedState || hasText ? 1 : 0, {
            duration: 200,
        });
    }, [hasText, isFocusedState]);

    const animatedLabelStyle = useAnimatedStyle(() => {
        const translateY = labelPosition.value === 1 ? -10 : 12;
        const translateX = labelPosition.value === 1 ? 8 : 10;
        const fontSize = labelPosition.value === 1 ? 13 : 16;

        return {
            transform: [
                { translateY: withTiming(translateY, { duration: 200 }) },
                { translateX: withTiming(translateX, { duration: 200 }) },
            ],
            fontSize,
        };
    });

    const handleInputLayout = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        setInputHeight(height);
    };

    const eyeIconTopOffset = inputHeight > 0 ? inputHeight / 2 : "50%";

    return (
        <View
            style={[{ marginTop: 12, position: "relative" }, style]}
            pointerEvents="box-none"
        >
            {label && (
                <Animated.View
                    pointerEvents={"none"}
                    style={[
                        {
                            position: "absolute",
                            zIndex: 10,
                            backgroundColor: COLORS.background,
                            paddingHorizontal: 8,
                        },
                        animatedLabelStyle,
                    ]}
                >
                    <RNText
                        pointerEvents="none"
                        size="md"
                        style={{ color: COLORS.secondaryText }}
                    >
                        {label}
                    </RNText>
                </Animated.View>
            )}

            <TextInput
                {...props}
                value={value}
                onChangeText={onChangeText}
                onLayout={handleInputLayout}
                placeholder={isFocusedState ? "" : placeholder}
                placeholderTextColor={COLORS.muted}
                onFocus={() => {
                    isFocused.value = true;
                    setIsFocusedState(true);
                    labelPosition.value = withTiming(1, { duration: 200 });
                }}
                onBlur={() => {
                    isFocused.value = false;
                    setIsFocusedState(false);
                    if (!hasText) labelPosition.value = withTiming(0, { duration: 200 });
                }}
                secureTextEntry={showPassword}
                autoComplete={props.secureTextEntry ? "off" : props.autoComplete}
                autoCapitalize={props.secureTextEntry ? "none" : props.autoCapitalize}
                style={[
                    {
                        borderWidth: 1,
                        borderColor: COLORS.secondaryText,
                        color: COLORS.text,
                        padding: 10,
                        borderRadius: 8,
                        fontSize: 16,
                    },
                ]}
            />
            {props.secureTextEntry && (
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        right: 16,
                        top: eyeIconTopOffset,
                        transform: [{ translateY: -9 }],
                    }}
                    onPress={() => setShowPassword((prev) => !prev)}
                    activeOpacity={0.7}
                >
                    <Entypo
                        name={!showPassword ? "eye-with-line" : "eye"}
                        size={18}
                        color={COLORS.muted}
                    />
                </TouchableOpacity>
            )}
        </View>
    );
}
